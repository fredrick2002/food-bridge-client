import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function DonorLogin({ route, navigation }) {
  const SERVER_IP = process.env.EXPO_PUBLIC_SERVER_IP;
    const { name, mobileNumber: initialNumber,userType: userType, email: email } = route.params; // Destructure initial number from route params

    const [mobileNumber, setNumber] = useState(initialNumber.toString()); // Set initial number as state

    const [password, setPassword] = useState('');
    const [cPassword, setConfirmPassword] = useState('');

    const handleDonorPress = async () => {
      try {
          if (name && mobileNumber && password === cPassword) {
              const response = await fetch(`http://${SERVER_IP}/donor-reg`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      name,
                      email,
                      mobileNumber: mobileNumber, // Convert to number
                      password, // Ensure this is securely handled and encrypted
                      userType
                  })
              });

              if (response.ok) {
                  const data = await response.json();
                  console.log('Success:', data);
                  navigation.navigate('Login', {});
              } else {
                  const errorData = await response.json();
                  console.error('Error:', errorData);
                  Alert.alert('Registration Failed', errorData.error || 'Failed to register');
              }
          } else {
              Alert.alert('Incomplete Details', 'Please fill in all the details and ensure passwords match');
          }
      } catch (error) {
          console.error('Error:', error);
          Alert.alert('Registration Failed', 'Please try again later');
      }
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
                    onPress={handleDonorPress}
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
        // marginTop:350,
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