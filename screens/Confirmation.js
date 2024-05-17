import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
// import DonorDetails from '../donorDetailsSchema';

const SERVER_IP = process.env.EXPO_PUBLIC_SERVER_IP;

export default function Confimation({route, navigation}){
    
    const { location, name, mobileNumber, values, dishes, selectedCategory, selectedmealType,} = route.params;
    const [district, setDistrict] = useState(''); // State to hold the district


    useEffect(() => {
        if (location) {
            getDistrictFromAddress(location).then(districtResult => {
                console.log('District:', districtResult);
                setDistrict(districtResult); // Set the district state
            });
        }
    }, [location]); 


    const donationData = {
        name: name,
        mobileNumber: mobileNumber,
        no_of_servings: values,
        food_category: selectedCategory,  
        meal_type: selectedmealType,      
        add_info: ' ', 
        dishes: dishes,
        location: {
            address: location,
            district: district  // Make sure this is just a string
        }
    };

    const handleConfirm = async () => {
        console.log(donationData);
        try {
            const response = await axios.post(`http://${SERVER_IP}/api/donations`, donationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Donation Success:', response.data);

            navigation.navigate('Success', { message: response.data.message });
        } catch (error) {
            console.error('Error submitting donation:', error);
        }
    };
    async function getDistrictFromAddress(address) {
        const apiKey = process.env.EXPO_PUBLIC_API_KEY; // Replace with your actual Google API key
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
        try {
            const response = await axios.get(url);
            // console.log(JSON.stringify(response.data, null, 2));  // Debug: see full response data
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

    return(
        <>
        <SafeAreaView style={styles.container}>
                <View style={styles.upper}>
                <View style={styles.header}>
                        <Image source={require("../assets/keyboard_backspace.png")} style={styles.back} />
                        <Text style={styles.title}>Enter Details</Text>
                        <Image source={require("../assets/info.png")} style={styles.info} />
                    </View>
                    <View style={styles.line} />
                    <Image source={require("../assets/progress_bar3.png")} style={styles.progressBar} />
                <View style={styles.progressDetails}>
                    <Text style={styles.primaryDetails}>Primary Details</Text>
                    <Text style={styles.dishes}>Name of Dishes</Text>
                    <Text style={styles.publish}>Publish</Text>
                </View>
                <View style={styles.line2} />
                </View>
                <View style={styles.donationContainer}>
                    <Text style={styles.donationTitle}>Confirm your donation</Text>
                    <View style={styles.donateContainer}>
                        <View style={styles.mainDetails}>
                        <View style={styles.rowContainer}>
                            <View style={styles.imageContainer}>
                                <Image source={require("../assets/person.png")} style={styles.person} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text>{name} | {mobileNumber}</Text>
                            </View>
                            <View style={styles.editContainer}>
                                <TouchableOpacity >
                                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.rowContainer}>
                           <View style={styles.imageContainer}>
                               <Image source={require("../assets/location.png")} style={styles.location} />
                            </View>
                        <View style={styles.textContainer}>
                           <Text>{location}</Text>
                    </View>
                </View>
                </View> 
                        <View style={styles.liteLine}/>
                        <View style={styles.servingDetails}>
                        <View style={styles.rowContainer1}>
                            <Text style={styles.servingTitle}>{values} Servings</Text>
                              <TouchableOpacity >
                               <Image source={require("../assets/edit.png")} style={styles.editIcon1} />
                              </TouchableOpacity>
                        </View>
                        <View style={styles.rowContainer}>
    {/* Render the food category icon */}
    {/* Render the category icon */}
{selectedCategory && (
    <View >
        <Image
            source={
                selectedCategory === 'Veg'
                    ? require('../assets/vegbutton.png')
                    : selectedCategory === 'Non-Veg'
                    ? require('../assets/Nonvegbutton.png')
                    : selectedCategory === 'Both'
                    ? require('../assets/bothbutton.png')
                    : null // Add additional conditions as needed
            }
            style={[
                styles.icon,
                selectedCategory === 'Veg' && styles.vegIcon,
                selectedCategory === 'Non-Veg' && styles.nonVegIcon,
                selectedCategory === 'Both' && styles.bothIcon,
            ]}
        />
    </View>
)}

{/* Render the meal type icon */}
{selectedmealType && (
    <View >
        <Image
            source={
                selectedmealType === 'Breakfast'
                    ? require('../assets/breakfastbutton.png')
                    : selectedmealType === 'Lunch'
                    ? require('../assets/lunchbutton.png')
                    : selectedmealType === 'Dinner'
                    ? require('../assets/dinnerbutton.png')
                    : null // Add additional conditions as needed
            }
            style={[
                styles.icon,
                selectedmealType === 'Breakfast' && styles.breakfastIcon,
                selectedmealType === 'Lunch' && styles.lunchIcon,
                selectedmealType === 'Dinner' && styles.dinnerIcon,
            ]}
        />
    </View>
)}

</View>

<Text style={styles.dishesTitle}>
    Dishes  
    <Text style={styles.dishCount}> ({dishes.length})</Text>
</Text>
                            <View style={styles.dishesContainer}>
                                
                                {chunkArray(dishes, 5).map((column, colIndex) => (
                                    <View key={colIndex} style={styles.column}>
                                        {column.map((dish, index) => (
                                            <View key={index} style={styles.dishRow}>
                                                <Image source={require("../assets/arrowright.png")} style={styles.arrow} />
                                                <Text style={styles.dishname}>{dish}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        </View>
                  </View>
                </View>
                <View style={styles.nextContainer}>
            <TouchableOpacity style = {styles.next} onPress={handleConfirm}>
                    <Text style = {styles.textNext}>Publish</Text>
            </TouchableOpacity>
            </View>
            </SafeAreaView>
        </>
    )
}

const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: 'white',
    },
    upper: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingBottom: 20, // Adjust this value to control the distance from the bottom
    },
    header: {
        padding: 20,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    back: {
        marginTop: 8,
        marginLeft: 15,
        position: "absolute",
        height:22,
        width: 22,
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 30
    },
    info: {
        marginTop: 7,
        marginLeft: 205,
        height:20,
        width: 20,
    },
    line: {
        padding:0,
        marginTop: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#ADABAB40',
        marginBottom: 10,
    },
    progressBar: {
        alignSelf: "center",
        marginTop: 10,
        height:22.5,
        width:280,
    },
    progressDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingLeft: 35,
        paddingRight: 50,
    },
    primaryDetails: {
        fontSize: 12,
        color: '#ADABAB',
    },
    dishes: {
        fontSize: 12,
        paddingRight: 20,
        color: '#ADABAB',
    },
    publish: {
        fontSize: 12,
    },
    line2: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ADABAB40',
        marginBottom: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    donationContainer:{
        paddingLeft:20,
        paddingRight:20,
    },
    donateContainer:{
        borderColor:'#D1D5DB',
        borderWidth:1,
        borderRadius:10, 
        paddingBottom:30,
        paddingTop:10
    },
    donationTitle:{
        fontSize:18,
        fontWeight:"500",
        marginBottom:10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        marginRight: 10, // Adjust the spacing between image and text content
    },
    textContainer: {
        flex: 1, // Allow the text container to expand
        marginBottom: 10,
        marginRight: 15,
    },
    location: {
        height: 25,
        width: 25,
        marginBottom: 10,
        // Add any additional styling for the location image here
    },    
    person: {
        height: 25,
        width: 25,
        marginBottom: 10,
        // Add any additional styling for the person image here
    },
    editContainer:{
        marginRight: 10,
    },
    editIcon:{
        height: 20,
        width: 20,
        marginBottom: 10,
    },
    rowContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Add this to space the text and edit icon
    },
    
    editIcon1:{
        height: 20,
        width: 20,
        marginBottom: 10,
        marginRight: 10,
    },
    liteLine:{
        marginTop: 10,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
        borderStyle: 'dotted',
    },
    mainDetails:{
        paddingLeft:20
    },
    servingDetails:{
        paddingLeft:20
    },
    servingTitle:{
        fontSize:18,
        fontWeight:"500",
        marginBottom:10,
    },
    vegIcon:{
        height:29.5,
        width:76,
    },
    nonVegIcon:{
        height:29.5,
        width:106.5,
    },
    bothIcon:{
        height:29.5,
        width:80,
    },
    breakfastIcon:{
        height:30,
        width:113.5,
        marginLeft:20,
    },
    lunchIcon:{
        height:30,
        width:91,
        marginLeft:20,
    },
    dinnerIcon:{
        height:30,
        width:94,
        marginLeft:20,
    },
    dishesTitle:{
        marginTop: 10,
        fontSize:18,
        fontWeight:"500",
        marginBottom:10,
    },
    dishCount:{
        color:'#6B7280',
    },
    dishesContainer: {
        flexDirection: 'row',
    },
    column: {
        flex: 1,
    },
    dishRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrow:{
        height: 20,
        width: 20,
        marginBottom:5,
    },
    dishname: {
        fontSize:16,
        marginBottom:5,
        paddingLeft:5,
    },
    nextContainer: {
        marginTop: 'auto', // Push the container to the bottom
        alignSelf: 'stretch', // Make sure the container stretches across the screen
        alignItems: 'center', // Center the button horizontally
        marginBottom: 25, // Add a margin at the bottom
    },
    next: {
        marginLeft: 20,
        marginRight: 20,
        paddingVertical: 28,
        borderColor: "#3468C0",
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "#3468C0",
        flexDirection: 'row', // Align children vertically in the center
        alignItems: 'center',
        position: 'absolute', // Position absolutely
        bottom: 0, // Position at the bottom with a margin
        left: 0, // Align to the left
        right: 0, // Align to the right
    },    
    textNext:{
        position:"absolute",
        fontSize:18,
        color:"#FFFFFF",
        alignSelf:"center",
        marginTop:16,
        marginLeft:'40%',
    },
    
});
