import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity, TextInput, Alert } from 'react-native';


export default function Screen1({ navigation }) {

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  const handlePress = () => {

    if (name && mobileNumber && email) {
      // Navigate to the next screen
      navigation.navigate('Roles', {  name: name, number:mobileNumber });    
    } else {
      // Show alert if any input field is empty
      Alert.alert('Incomplete Details', 'Please fill in all the details');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.baseText}>Welcome</Text>
      <Text style={styles.description}>let’s get you started, Enter your details here</Text>
      <View style={styles.inner}>
        <Text style={styles.inputheader}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="enter your name here"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.inputheader}>Mobile number</Text>
        <TextInput
          style={styles.input}
          placeholder="enter your mobile number here"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="numeric"
        />
        <Text style={styles.inputheader}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="enter your email address here"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity
        style={[styles.button, (!name || !mobileNumber || !email) ? styles.disabledButton : styles.enabledButton]}
        onPress={handlePress}
        disabled={!name || !mobileNumber || !email}
        activeOpacity={0.8}
      >
      <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      padding: 20,
      justifyContent: 'space-between',
    },
    description: {
      color: '#374151',
      fontWeight: '300',
      fontSize:18,
    },
    baseText: {
      color: '#3468C0',
      fontSize: 30,
      fontWeight: '700',
      marginTop:56,
    },
    inner: {
      flex: 1,
    },
    input: {
      padding: 10,
      borderColor: '#5A5959',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
    },
    inputheader: {
      color:'#1D1D1D',
      fontSize:16,
      marginTop:20,
      paddingBottom: 10,
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
});
