import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({  
  grid: {
    marginTop: 25,
    width: '95%',  
    alignSelf: 'center',
    gap: 0,        
  },
  header: {
    backgroundColor: 'rgba(153, 185, 255, 0.6)',             
    flexDirection: 'row',    
    alignItems: 'center',
    height: 30,       
  },
  textHeaderOne: {
    width: '65%',
    textAlign: 'center',
    fontSize: 15,  
    fontWeight: '600',     
  },
  textHeaderTwo: {
    width: '30%',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  row: {               
    flexDirection: 'row',    
    alignItems: 'center',
    height: 25,
  },
  textColumnOne: {
    width: '65%',    
    fontSize: 15,  
    paddingLeft: '4%',    
  },
  textColumnTwo: {
    width: '30%',    
    textAlign: 'center',
    fontSize: 15,       
  },
})