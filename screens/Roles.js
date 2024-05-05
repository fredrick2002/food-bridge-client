import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';

export default function Screen2({ route, navigation }) {
  const { name } = route.params;
  const{ number } = route.params;

  const handleDonorPress = () => {
    // Handle Donor button press
    navigation.navigate('donorLogin', {name: name, number:number}); 
  };
  
  const handleReceiverPress = () => {
    // Handle Receiver button press
    navigation.navigate('receiverLogin' , {name: name, number:number}); 
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.baseText}>Hey {name}</Text>
      <Text style={styles.descripi}>You are  a ________________</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDonorPress}>
          <Text style={styles.buttonText}>Donor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReceiverPress}>
          <Text style={styles.buttonText}>Receiver</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lines} />
      <Image 
         source={require('../assets/images/screen2.png')}
        style={styles.img}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 50,
    backgroundColor: 'white',
  },
  descripi: {
    color: '#374151',
    fontWeight: '500',
    marginTop: 20,
    fontSize: 20,
    paddingLeft:20,
    marginBottom:20,
  },  
  baseText: {
    color: '#3468C0',
    fontSize: 30,
    fontWeight: '700',
    paddingLeft:20,
    marginTop:30,
  },
  buttonContainer: {
    flexDirection: 'row', // Ensure buttons are displayed in the same row
    // justifyContent: 'center', // Center buttons horizontally
    paddingLeft:20,
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#3468C0',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginVertical: 20,
    marginLeft: 15,
    marginRight: 40, // Add some horizontal margin between buttons
  },
  buttonText: {
    color: '#3468C0',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  lines: {
    height: 1.2, // Adjust the height of the line as needed
    backgroundColor: 'rgba(0, 0, 0, 0.20)', // Set the color of the line
    marginVertical: 8, 
  },
  img: {
    marginTop:15,
    width: 330, // Adjust width as needed
    height: 330, // Adjust height as needed
    borderRadius: 0, // Add borderRadius as needed
    alignSelf: 'center', // Align image to the center horizontally
  },
});
