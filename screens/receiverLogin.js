import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function ReceiverLogin({ route, navigation }) {
  const { name, mobileNumber: initialNumber, email:email, userType:userType } = route.params; // Destructure initial number from route params

  const [mobileNumber, setNumber] = useState(initialNumber.toString()); // Set initial number as state

  const [password, setPassword] = useState('');
  const [cPassword, setConfirmPassword] = useState('');

  const handleReciverPress = () => {
      // Handle Donor button press
      navigation.navigate('ReceiverDetails', { 
        name: name,
        email:email, 
        mobileNumber: mobileNumber,
        password: password,
        userType: userType
      });
  };

  return (
      <>
          <View style={styles.container}>
              <Text style={styles.title}>Create your account</Text>
              <View style={styles.forms}>
                  <Text style={styles.input}>Mobile Number</Text>
                  <View style = {styles.inputContainer}>
                  <TextInput
                      style={styles.inputBoxnumber}
                      placeholder="Enter your mobile number here"
                      value={mobileNumber} // Use state value
                      onChangeText={setNumber} // Update state on change
                      keyboardType="numeric"
                  />
                  </View>
                  
                  <Text style={styles.input}>Create Password</Text>
                  <View style = {styles.inputContainer}>
                  
                  <TextInput
                      style={styles.inputBox}
                      placeholder="Enter your password here"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={true}
                  />
                  <Image
                  source={require('../assets/show.png')}
                  style={styles.placeholderImage}
                  />
                  </View>
                  
                  <Text style={styles.input}>Confirm Password</Text>
                  <View style = {styles.inputContainer}>
                  
                  <TextInput
                      style={styles.inputBox}
                      placeholder="Confirm your password here"
                      value={cPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={true}
                  />
                  <Image
                  source={require('../assets/show.png')}
                  style={styles.placeholderImage}
                  />
                  </View>
                  
              </View>
              <TouchableOpacity
                  style={[styles.button, (!mobileNumber || !password || !cPassword) ? styles.disabledButton : styles.enabledButton]}
                  onPress={handleReciverPress}
                  disabled={!mobileNumber || !password || !cPassword}
                  activeOpacity={0.8}
              >
                  <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
          </View>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      flex: 1,
      paddingTop: 50,
      backgroundColor: 'white',
      paddingLeft:20,
      paddingRight:20,
    },
    title:{
      color: '#3468C0',
      fontSize: 30,
      fontWeight: '700',
      marginTop:24,
    },
    input:{
      fontSize:16,
      paddingBottom:10,
      paddingTop:24,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ADABAB',
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    inputBox:{
      flex: 1,
      height: 40,
      color: '#969698',
      paddingHorizontal: 10,
      fontSize: 16,
    },
    inputBoxnumber:{
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    placeholderImage:{
      width: 20,
      height: 20,
      marginRight: 0,
      // position:"absolute",
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: "grey", 
    },
    enabledButton: {
      backgroundColor: "#3468C0", 
    },
    disabledButton: {
      backgroundColor: "lightgrey", 
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    }
})  