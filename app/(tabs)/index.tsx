import  {StatusBar} from 'expo-status-bar';
import { StyleSheet,Text, View, } from 'react-native';



export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color:"red"}}>Home Screen</Text>
      
      <StatusBar style= "light"></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 150,
    color: 'red',
  },
  TextButton: {
    color: 'blue',
  },


})
