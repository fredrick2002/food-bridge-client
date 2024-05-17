import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const SERVER_IP = process.env.EXPO_PUBLIC_SERVER_IP;

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

    const handleSignPress = () => {
        navigation.navigate('Welcome')
    }
    const handleLogin = async () => {
      try {
          // Perform login/authentication process
  
          // Send GET request to backend server to fetch user information
          const response = await fetch(`http://${SERVER_IP}/user?mobileNumber=${mobileNumber}&password=${password}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          // Check if request was successful
          if (response.ok) {
              const userData = await response.json();
              const userType = userData.userType;
  
              // Fetch user details from MongoDB based on userType and mobileNumber
              const userDetailsResponse = await fetch(`http://${SERVER_IP}/userDetails?mobileNumber=${mobileNumber}&userType=${userType}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });

              if (userDetailsResponse.ok) {
                  const userDetails = await userDetailsResponse.json();
                  // Navigate to the next page based on userType and pass user details
                  await AsyncStorage.setItem('userData', JSON.stringify(userDetails));
                  if (userType === 0) {
                      navigation.navigate('DonorLocation', { });
                  } else if (userType === 1) {
                      navigation.navigate('ReceiverLocation', { });
                  } else {
                      Alert.alert('Invalid User Type', 'Please contact support.');
                  }
              } else {
                  Alert.alert('Request Failed', 'Failed to fetch user details.');
              }
          } else {
              // Handle failed request
              Alert.alert('Request Failed', 'Failed to fetch user information.');
          }
      } catch (error) {
          console.error('Request Error:', error);
          Alert.alert('Request Failed', 'Please try again later.');
      }
  };
  
    return(
        <>
        <SafeAreaView style = {styles.Container}>
            <View>
                <Text style = {styles.title}>Welcome back</Text>
                <View>
                    <Text style = {styles.input}>Mobile Number</Text>
                    <View style = {styles.inputContainer}>
                    <TextInput
                    style={styles.inputBox}
                    placeholder="enter your mobile number here"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    keyboardType="Numeric"/>
                    </View>
                    
                    <Text style={styles.input}>Password</Text>
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
                    <Text style = {styles.innerTexts}>Forgot password</Text>

                </View>
                <View style = {styles.containerLogin}>
                <Text style = {styles.text}>Don’t have an account ? <Text onPress={handleSignPress} style = {styles.innerText} >Sign up here</Text></Text>
            </View>
            </View>
            <TouchableOpacity onPress={handleLogin}>
                <View style = {styles.button}>
                <Text style = {styles.buttonText}>Login</Text>
                </View>
                
            </TouchableOpacity>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    Container:{
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
      placeholderImage:{
        width: 20,
        height: 20,
        marginRight: 0,
        // position:"absolute",
      },
      containerLogin:{
        paddingTop:20,
        justifyContent : "center",
        alignItems: "center"
      },
      text:{
        color:'#5A5959',
      },
      innerTexts:{
        paddingTop:10,
        color: '#3468C0',
      },
      innerText:{
        color: '#3468C0',
      },
      button:{
        padding:20,
        backgroundColor:'#3468C0',
        
        marginTop:200,
        alignItems:"center",
        borderRadius:10,
      },
      buttonText:{
        color:'white',
        fontSize:16,
      }
})
