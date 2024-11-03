import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    gap: 25,
  },

  groupView: {
    backgroundColor: '#fafafa', 
    paddingHorizontal: 15,           
    paddingVertical: 15,
    borderRadius: 15,
  },

  groupTitle: {
    fontSize: 16,
    fontWeight: 'bold',    
    marginBottom: 10,
  },  

  label: {
    fontWeight: '500',
  },

  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  radioLabel: {
    fontSize: 16,
    marginLeft: 4,
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

  addButton: {        
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center', 
  },

  buttonContent: {
    color: '#000',
    borderColor: '#000',    
    borderRadius: 50,
    borderWidth: 2,    
    width: 26,
    height: 26,
    textAlign: 'center',    
    fontSize: 16,
    marginHorizontal: 20,
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

  informationsList: {
    flexDirection: 'row',  
    gap: 10, 
    marginTop: -5, 
    marginBottom: 20,
  },

  information: {
    flexDirection: 'row',  
    gap: 10,       

    backgroundColor: '#99b9ff',
    color: '#fff',
    borderRadius: 15,

    height: 35,
    paddingVertical: 5,
    paddingHorizontal: 15,    
  },

  removeInformation: {
    color: '#000',
    borderColor: '#000',    
    borderRadius: 50,
    borderWidth: 2,    
    width: 26,
    height: 26,
    textAlign: 'center',    
    fontSize: 16,
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
