import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView , TouchableOpacity} from 'react-native';
import axios from 'axios';
const SERVER_IP = process.env.EXPO_PUBLIC_SERVER_IP;
// Card items
const Card = ({ donorName, time, servings, rlocation, category, countDishes, onPress }) => {
  const getCategoryImage = () => {
    switch (category.toLowerCase()) {
      case 'Veg':
        return require("../assets/veg.png");
      case 'Non-Veg':
        return require("../assets/nonveg.png");
      case 'Both':
        return require("../assets/both.png");
      default:
        return 
    }
  };


  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={require("../assets/account.png")} style={styles.cardIcons}/>
        <View style={styles.cardTop}>
          <Text style={styles.donorName}>{donorName}</Text>
          <Text>{time}</Text>
        </View>
        <View style={styles.servingsContainer}>
          <Image source={require("../assets/servingcount.png")} style={styles.servingsIcon1}/>
          <Text style={styles.servings}>{servings}</Text>
          <Image source={getCategoryImage()} style={styles.servingsIcon2} />
          <Text style={styles.servingsDescription}>{category} | {countDishes} Dishes</Text>
          <Image source={require("../assets/donorlocation.png")} style={styles.servingsIcon3}/>
          <Text style={styles.servingsDescription}>{rlocation}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ReceiverHomeScreen({ route, navigation }) {
  const { location, name, number } = route.params;
  const [cardData, setCardData] = useState([]);
  const [district, setDistrict] = useState([]);


  useEffect(() => {
    async function getDistrictFromAddress(location) {
      const apiKey = process.env.EXPO_PUBLIC_API_KEY; // Replace with your actual API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;
  
      try {
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.results.length > 0) {
          const components = response.data.results[0].address_components;
          const districtComponent = components.find(c => c.types.includes('administrative_area_level_3'));
          return districtComponent ? districtComponent.long_name : 'District not found';
        } else {
          console.log('No results or error:', response.data.status);
          return 'No district found';
        }
      } catch (error) {
        console.error('Failed to fetch address details:', error);
        return 'Error fetching district';
      }
    };
  
    if (location) {
      getDistrictFromAddress(location).then(districtResult => {
        console.log('District:', districtResult);
        setDistrict(districtResult); 
        fetchData(districtResult);
      });
    }
  }, [location]);
 
  //Fetch data by district
  function fetchData(district) {
    if (!district) return; // Ensure district is not empty

    axios.get(`http://${SERVER_IP}/api/donations?district=${encodeURIComponent(district)}`)
      .then(response => {
    // Convert the response data to JSON string
    const jsonString = JSON.stringify(response.data);
    console.log("JSON String:", jsonString);

    // Parse the JSON string back to JavaScript object
    const jsonObject = JSON.parse(jsonString);
    console.log("Re-parsed JSON Object:", jsonObject);

    // Now, map over your jsonObject to structure it for your application's state
    const fetchedData = jsonObject.map(item => ({
      donorName: item.name,
      time: 'Some time ago', // Example placeholder
      servings: `${item.no_of_servings} servings`,
      rlocation: item.location ? item.location.district : 'No address provided',
      category: item.food_category,
      countDishes: item.dishes ? item.dishes.length : 0,
      onPress: () => handlePress(item),
    }));
    
    setCardData(fetchedData);
    console.log(fetchedData);
  })
  .catch(error => {
    console.error('Failed to fetch donations:', error);
  });
  }
  


  // const handlePress = (item) => {
  //   navigation.navigate('CardDetails', {
  //     donorName: item.name,
  //     time: item.time,
  //     servings: item.servings,
  //     rlocation: item.rlocation,
  //     category: item.category,
  //     countDishes: item.countDishes
  //   });
  // }

  // Split the address string at the comma and take the first part
  const addressParts = location.split(',');
  const formattedLocation = addressParts[0].trim();

  // Truncate the full location string to a certain length
  const maxLength = 45; // Define the maximum length you want to display
  const truncatedLocation = location.length > maxLength ? location.substring(0, maxLength) + '...' : location;

  // Card data
  // const cardData = [
  //   { donorName: 'Solomon', servings: "50 servings", rlocation: "kaniyakumari", category: "Veg", countDishes: "13" },
  //   { donorName: 'Dinesh', servings: "75 servings", rlocation: "chennai", category: "Non Veg", countDishes: "10" },
  //   { donorName: 'Ponnu', servings: "25 servings", rlocation: "dharmapui", category: "Both", countDishes: "18" },
  // ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Location and Receiver Details */}
      <View style={styles.currentContainer}>
        <Image source={require("../assets/arrow.png")} style={styles.locationImage} />
        <Text style={styles.userLocation}>{formattedLocation}</Text>
        <Image source={require("../assets/expand.png")} style={styles.expandImage} />
      </View>
      <Image source={require("../assets/account.png")} style={styles.usericon}/>
      <Text style={styles.userfullLocation}>{truncatedLocation}</Text>
      <View style={styles.line} />
      
      {/* Card */}
      <View style={styles.cardContainer}>
        {cardData.map((item, index) => (
          <Card
            key={index}
            donorName={item.donorName}
            servings={`${item.servings} servings`}
            rlocation={item.rlocation}
            category={item.category}
            countDishes={item.countDishes}
            onPress={() => handlePress(item)}
          />
        ))}
      </View>
      
      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <View>
          <Image source={require("../assets/homepage.png")} style={styles.homeicon}/>
          <Text>Home</Text>
        </View>
        <View>
          <Image source={require("../assets/donateplus.png")} style={styles.donateplusicon}/>
          <Text style={styles.navtext}>Donate</Text>
        </View>
        <View>
          <Image source={require("../assets/message.png")} style={styles.messageicon}/>
          <Text style={styles.navtext}>Chat</Text>
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
      },

      cardContainer: {
        flex: 1,
        marginLeft:20,

      },
      card: {
        width: 350,
        height: 150,
        // backgroundColor: 'lightgray',
        borderColor:"#ADABAB",
        borderWidth:1,
        borderRadius:10,
        marginVertical: 10,
        color:"#ADABAB",
        
      },
      cardIcons:{
      width:24,
      height:24,
      marginTop:10,
      marginLeft:20,
      position:"absolute"
      },
      cardTop:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight:10,
        paddingTop:10,
      },
      donorName:{
        paddingLeft:53,
        
        // position: "absolute"
      },
      servingsContainer:{
        paddingTop:20,
        paddingRight:10,
      },
      servingsIcon1:{
      width:24,
      height:24,
      marginTop:20,
      marginLeft:20,
      position:"absolute"
      },
      servings:{
        paddingLeft:53,
        fontWeight:"700",
        paddingBottom:14,
      },
      servingsIcon2:{
        width:18,
        height:18,
        marginTop:55,
        marginLeft:20,
        position:"absolute"
        },
      servingsIcon3:{
        width:24,
        height:24,
        marginTop:80,
        marginLeft:20,
        position:"absolute"
        },
      servingsDescription:{
        paddingLeft:53,
        paddingBottom:12,
      }
    
});