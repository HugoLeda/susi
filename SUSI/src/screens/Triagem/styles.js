import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({  
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'flex-satrt',
    fontSize: 16,
  },  
  containerHead: {
    backgroundColor: '#0D0D0D',
    height: 175,         
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',    
  },
  text: {
    color: '#fff',
    fontSize: 32
  },
  containerInput: {
    flexDirection: 'row',    
    gap: 1,      
    marginTop: -27,
  },
  input: {
    backgroundColor: '#262626',
    color: '#F2F2F2',
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
    color: '#FFF',
    borderColor: '#FFF',    
    borderRadius: 50,
    borderWidth: 1,    
    width: 26,
    height: 26,
    textAlign: 'center',
  },
})