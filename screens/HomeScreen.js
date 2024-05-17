import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView , TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ route, navigation }) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataFromStorage = await AsyncStorage.getItem('userData');
        console.log(userDataFromStorage);
        setUserData(userDataFromStorage ? JSON.parse(userDataFromStorage) : null);
      } catch (error) {
        console.error('Error retrieving user data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  console.log('user:',userData);
  
    const { location } = route.params;
    const name = userData ? userData.name : '';
    const mobileNumber = userData ? userData.mobileNumber : '';
  

    const handlePress = () => {
      navigation.navigate('EnterDetails', {name: name, location: location, mobileNumber: mobileNumber });
    }
  
    // Split the address string at the comma and take the first part
    const addressParts = location.split(',');
    const formattedLocation = addressParts[0].trim();
  
    // Truncate the full location string to a certain length
    const maxLength = 45; // Define the maximum length you want to display
    const truncatedLocation = location.length > maxLength ? location.substring(0, maxLength) + '...' : location;
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.currentContainer}>
          <Image source={require("../assets/arrow.png")} style={styles.locationImage} />
          <Text style={styles.userLocation}>{formattedLocation}</Text>
          <Image source={require("../assets/expand.png")} style={styles.expandImage} />
        </View>
        <Image source={require("../assets/account.png")} style = {styles.usericon}/>
        <Text style={styles.userfullLocation}>{truncatedLocation}</Text>
        <View style={styles.line} />
        <View>
            <Text style = {styles.headder}>Hey <Text style={styles.name}>{name}</Text></Text>
            <Text style = {styles.description}>Begin with a donation and let the goodness spread</Text>
            <View>
              <Image source={require("../assets/primaryimage.png")} style = {styles.primaryimg}/>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Image source={require("../assets/plus.png")} style={styles.plus}/>
            <Text style={styles.buttontext}>Add to Donation</Text>
            </TouchableOpacity></View>
        </View>
        {/* <View style={styles.liteline} /> */}
        {/* <View style={styles.iconcontainer}>
            <Image source={require("./assets/homepage.png")} style = {styles.homeicon}/>
            <Image source={require("./assets/donateplus.png")} style = {styles.donateplusicon}/>
            <Image source={require("./assets/message.png")} style = {styles.messageicon}/>
        </View>
        <View style={styles.icontextcontainer}>
          <Text style = {styles.home}>Home</Text>
          <Text style = {styles.donateplus}>Donate</Text>
          <Text style = {styles.chat}>Chat</Text>
        </View> */}
        <View style={styles.navbar}>
        <View>
            <Image source={require("../assets/homepage.png")} style = {styles.homeicon}/>
            <Text>Home</Text>
        </View>
        <View>
            <Image source={require("../assets/donateplus.png")} style = {styles.donateplusicon}/>
            <Text style = {styles.navtext}>Donate</Text>
        </View>
        <View>
            <Image source={require("../assets/message.png")} style = {styles.messageicon}/>
            <Text style = {styles.navtext}>Chat</Text>
        </View>
        </View>

      </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor:"white",
    },
    currentContainer: {
      paddingLeft:16,
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 20,
      paddingHorizontal: 10,
      position:"absolute"
    },
    locationImage: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
    expandImage: {
      width: 20,
      height: 20,
      marginLeft: 5,
    },
    userLocation: {
      fontSize:20,
      fontWeight:"500",
      marginBottom: 20,
      marginTop: 15,
    },
    userfullLocation:{
      paddingTop: 5,
      paddingLeft:26,
      color:"#707072",
      marginTop:60
    },
    usericon:{
      width:24,
      height:24,
      marginTop:45,
      marginLeft:340,
      position:"absolute"
    },
      line: {
        marginTop:20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.20)',
        marginBottom: 20,
      },
      headder:{
        paddingLeft:20,
        fontSize:20,
        fontWeight:"500",
      },
      name:{
        color:"#3468C0",
      },
      description:{
        paddingLeft:20,
        paddingTop:10,
        fontSize:14,
        color:"#5A5959",
      },
      buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'58%',
      },
      button:{
        padding:10,
        color:"white",
        backgroundColor:"#3468C0",
        borderRadius:50,
        height:50,
        width:220,
      },
      buttontext:{
        color:"white",
        marginLeft:'25%',
        fontSize:18,
        fontWeight:"500",
        shadowColor:"#000000"
      },
      plus:{
        height: 16,
        width: 16,
        position: 'absolute',
        top: '80%', // Position vertically centered
        transform: [{ translateY: -10 }], // Adjust for half of the height
        left: 25,
      },
      primaryimg:{
        height: 264,
        width: 264,
        marginTop:40,
        // marginBottom:20,
        alignSelf: "center",
      },
      navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16, // Add padding to the bottom to lift the navbar above the screen edge
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white', // Adjust as needed
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
      homeicon: {
        height: 24,
        width: 24,
        marginTop:10
      },
      donateplusicon: {
        height: 24,
        width: 24,
        marginTop:10,
        marginLeft: 8,
      },
      messageicon: {
        height: 24,
        width: 24,
        marginTop:10
      },
      navtext : {
        color:"#8F9092",
      }
});