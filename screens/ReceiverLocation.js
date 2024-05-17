import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function ReceiverLocation({ navigation, route }) {
  const { name } = route.params;
  const {number} = route.params;
  const [locate, setLocate] = useState('');
  const apiKey = process.env.EXPO_PUBLIC_API_KEY; 
  // console.log(apiKey);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission not granted', 'Failed to get location permissions');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
  };

  const getAddressFromCoords = async (latitude, longitude) => {
    
    
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
    const responseJson = await response.json();
    if (responseJson.results.length > 0) {
      return responseJson.results[0].formatted_address;
    } else {
      throw new Error('No address found for this location.');
    }
  };

  const handleDonorPress = async () => {
    try {
      const coords = await getCurrentLocation();
      const address = await getAddressFromCoords(coords.latitude, coords.longitude);
      setLocate(address); // Update the text input with the fetched address
      navigation.navigate('ReceiverHomescreen', { location: address, name: name , number: number});
    } catch (error) {
      // Alert.alert('Error', 'Unable to fetch location: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter your location</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/search1.png')}
          style={styles.placeholderImage}
        />
        <GooglePlacesAutocomplete
          placeholder='Try GKM palace, etc'
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            navigation.navigate('Homescreen', { location: details.formatted_address, name, number });
          }}
          query={{
            key: apiKey,
            language: 'en',
            types: 'geocode', // Can be 'establishment', 'addresses', 'geocode', 'regions', and more
          }}
          styles={{
            textInput: styles.input,
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={200} // Add a delay as user types
        />
      </View>
      <View style={styles.currentContainer}>
        <Image source={require("../assets/arrow.png")} style={styles.locationImage}/>
        <TouchableOpacity onPress={handleDonorPress}>
          <Text style={styles.userLocation}>Use my current location</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: 'white',
  },
  title: {
    color: "#000000",
    fontWeight: "500",
    paddingBottom: 30,
    marginTop:5,
    fontSize: 20,
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
  placeholderImage: {
    width: 20,
    height: 20,
    marginRight: 0,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#969698',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  currentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 0,
  },
  locationImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  userLocation: {
    color: '#3468C0',
    marginBottom: 20,
    marginTop: 18,
    fontSize:16,
  },
  line: {
    borderBottomWidth: 1.2,
    borderBottomColor: 'rgba(0, 0, 0, 0.20)',
    marginBottom: 20,
  },
});