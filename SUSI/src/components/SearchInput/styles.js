import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({  
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',    
    gap: 1,      
    marginTop: -27,
  },
  input: {
    backgroundColor: '#fafafa',
    color: '#000',
    width: 271,
    height: 54,
    borderRadius: 6,
    padding: 16,  
    marginRight: 4,  
  },
  button: {
    backgroundColor: '#066699',
    height: 52,
    width: 52,
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
  },
})