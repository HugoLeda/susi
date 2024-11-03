import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
  container: {
    paddingTop: 15,    
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    gap: 25,  
  },

  groupView: {
    backgroundColor: '#fafafa', 
    paddingHorizontal: 15,           
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 10,
  },

  groupTitle: {
    fontSize: 16,
    fontWeight: 'bold',    
    marginBottom: 10,
  },  

  label: {
    fontWeight: '500',
  },

  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',    
  },

  inputList: {        
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',    
    gap: 1,  
  },

  sectionView: {
    flexDirection: 'row',       
    width: '100%',
    justifyContent: "space-between",
    alignItems: 'center',
  },

  view25: {
    width: '25%',
  }, 

  view50: {
    width: '47%',
  },

  view70: {
    width: '70%',
  },

  view80: {
    width: '80%',
  },

  button: {
    marginTop: 20,
    width: '80%',
    padding: 15,
    backgroundColor: '#066699',
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 'auto',    
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
