import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'

interface Props extends NativeStackScreenProps<any,any>{};

const ChangeCallout = ({navigation}: Props) => {
    const [inputCallout, setInputCallout] = useState('');

    return (
        <View
        style={styles.container}>
            <TextInput
                placeholder='Nombre Consecionaria...'
                style={styles.input}
                onChangeText={(val) => {
                    setInputCallout(val);
                    console.log(JSON.stringify(val));
                }}
            />
            <TouchableOpacity
            style={styles.button}
            onPress={()=>{
                navigation.navigate('Mapa', {inputCallout: inputCallout})
            }}
            >
            <Text style={styles.inputText}> Siguiente </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 30,
      paddingTop:20,
      backgroundColor: '#AE97BA'
    },
    button: {
      flex: 0,
      zIndex: 3,
      alignItems: "center",
      backgroundColor: '#A607F8',
      padding: 15,
      marginTop: 25,
      borderRadius: 15,
      marginBottom:10,
    },
    input: {
      borderWidth:3,
      borderColor: '#A607F8',
      backgroundColor: '#fff',
      borderRadius: 10,
      marginBottom: 25,
      width:332
    },
    inputText: {
      color:'#fff', 
      fontSize: 20, 
      fontWeight: 'bold'
    }
  });

export default ChangeCallout
