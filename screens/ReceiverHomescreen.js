import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView , TouchableOpacity} from 'react-native';

// Card items
const Card = ({ title, time, servings, rlocation, category, countDishes, onPress }) => {
  const getCategoryImage = () => {
    switch (category.toLowerCase()) {
      case 'veg':
        return require("../assets/veg.png");
      case 'non veg':
        return require("../assets/nonveg.png");
      case 'both':
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
          <Text style={styles.donorName}>{title}</Text>
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

  const handlePress = (item) => {
    navigation.navigate('cardDetials', {
      title: item.title,
      time: item.time,
      servings: item.servings,
      rlocation: item.rlocation,
      category: item.category,
      countDishes: item.countDishes
    });
  }

  // Split the address string at the comma and take the first part
  const addressParts = location.split(',');
  const formattedLocation = addressParts[0].trim();

  // Truncate the full location string to a certain length
  const maxLength = 45; // Define the maximum length you want to display
  const truncatedLocation = location.length > maxLength ? location.substring(0, maxLength) + '...' : location;

  // Card data
  const cardData = [
    { title: 'Solomon', time: '20 minutes ago', servings: "50 servings", rlocation: "kaniyakumari", category: "Veg", countDishes: "13" },
    { title: 'Dinesh', time: '01 hours ago', servings: "75 servings", rlocation: "chennai", category: "Non Veg", countDishes: "10" },
    { title: 'Ponnu', time: '30 minutes ago', servings: "25 servings", rlocation: "dharmapui", category: "Both", countDishes: "18" },
  ];

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
            title={item.title}
            time={item.time}
            servings={item.servings}
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