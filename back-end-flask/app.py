from flask import Flask, request, jsonify
from transformers import pipeline
import re

app = Flask(__name__)

# Carregar o pipeline de perguntas e respostas
qa_pipeline = pipeline(
  "question-answering",
  model="pierreguillou/bert-base-cased-squad-v1.1-portuguese",
  tokenizer="pierreguillou/bert-base-cased-squad-v1.1-portuguese"
)

def split_sentences(text):
  sentences = re.split(r'(?<=\.)\s+', text)
  return sentences

def extract_medical_info(context, question):
  response = qa_pipeline(question=question, context=context)
  answer = response['answer'].strip()
  if question.lower() in answer.lower():
    answer = answer.replace(question, "").strip()
  if len(answer) < 4 or answer in ["não sei", "não há", "menciona"]:
    return "Informação não clara ou não especificada pelo paciente."
  return answer

def summarize_pre_consultation(patient_text):
  sentences = split_sentences(patient_text)
  symptoms = extract_medical_info(" ".join(sentences), "Quais são os sintomas relatados?")
  duration = extract_medical_info(" ".join(sentences), "Há quanto tempo ele está sentindo esses sintomas?")
  pain_location = extract_medical_info(" ".join(sentences), "Qual é o local ou região da dor?")
  additional_info = extract_medical_info(" ".join(sentences), "Há outras informações relevantes relatadas pelo paciente?")

  return {
    "Sintomas": symptoms,
    "Duração": duration,
    "Localização da Dor": pain_location,
    "Informações Adicionais": additional_info,
  }

@app.route('/summarize', methods=['POST'])
def summarize():
  data = request.json
  patient_text = data.get('patient_text', '')
  summary = summarize_pre_consultation(patient_text)
  return jsonify(summary)

if __name__ == '__main__':
  app.run(host="0.0.0.0", port=5000)

