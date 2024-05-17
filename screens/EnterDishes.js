import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

// Function to chunk an array into smaller arrays
const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
}

export default function EnterDishes({ route, navigation }) {
    const { location } = route.params;
    const { name } = route.params;
    const { mobileNumber } = route.params;
    const { values } = route.params;
    const { selectedCategory } = route.params;
    const { selectedmealType } = route.params;

    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState('');


    const handleDishes = () => {
        navigation.navigate('Confirmation', { 
             name: name,
             location: location, 
             mobileNumber: mobileNumber, 
             values: values, 
             dishes: dishes , 
             selectedCategory: selectedCategory,
             selectedmealType: selectedmealType
            });
    }

    const handleAddDish = () => {
        if (newDish.trim() !== '') {
            setDishes([...dishes, newDish.trim()]);
            setNewDish('');
        }
    };

    const handleDeleteDish = (index) => {
        const updatedDishes = [...dishes];
        updatedDishes.splice(index, 1);
        setDishes(updatedDishes);
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.upper}>
                    <View style={styles.header}>
                        <Image source={require("../assets/keyboard_backspace.png")} style={styles.back} />
                        <Text style={styles.title}>Enter Details</Text>
                        <Image source={require("../assets/info.png")} style={styles.info} />
                    </View>
                    <View style={styles.line} />
                    <Image source={require("../assets/progress_bar2.png")} style={styles.progressBar} />
                <View style={styles.progressDetails}>
                    <Text style={styles.primaryDetails}>Primary Details</Text>
                    <Text style={styles.dishes}>Name of Dishes</Text>
                    <Text style={styles.publish}>Publish</Text>
                </View>
                <View style={styles.line2} />
                </View>
                <View style={styles.inputwhole}>
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/search1.png')}
                        style={styles.placeholderImage}
                    />
                   <TextInput
                        placeholder="Try 'Idly'"
                        style={styles.input}
                        value={newDish}
                        onChangeText={setNewDish}
                        onSubmitEditing={handleAddDish}
                        placeholderTextColor="#969698"
                    />
                </View>
                </View>

                <View style={styles.dishesContainer}>
                    <Text style={styles.dishesHeader}>Your Dishes</Text>
                    <View style={styles.dishRows}>
                        {chunkArray(dishes, 5).map((chunk, chunkIndex) => (
                            <View key={chunkIndex} style={styles.dishColumn}>
                                {chunk.map((dish, index) => (
                                    <View key={index} style={styles.dishRow}>
                                    <View style={styles.dishTextContainer}>
                                        <Text style={styles.dishText}>{dish}</Text>
                                        <TouchableOpacity onPress={() => handleDeleteDish(index + chunkIndex * 5)}>
                                            <Image source={require("../assets/delete.png")} style={styles.deleteIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View> 
                                ))}
                            </View>

                        ))}</View>
                    </View>
            <View style={styles.nextContainer}>
            <TouchableOpacity style = {styles.next} onPress={handleDishes}>
                    <Text style = {styles.textNext}>Next</Text>
                    <Image source={require("../assets/next.png")} style={styles.nextImg}/>
            </TouchableOpacity>
            </View>
            </SafeAreaView>
        </>
    );
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
    },
    publish: {
        fontSize: 12,
        color: '#ADABAB',
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
    inputwhole: {
        paddingLeft: 20,
        paddingRight: 20,
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
    searchInput: {
        marginLeft: 8,
        flex: 1
    },
    dishesContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 35,
    },
    dishesHeader: {
        fontSize: 18,
        fontWeight: "500",
    },
    dishRows: {
        flexDirection: 'row',
    },
    dishColumn: {
        flex: 1,
        marginLeft: 10,
    },
    dishRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    dishTextContainer: {
        backgroundColor: '#F4F4FA', // Just for visualization
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 10, // Add some space between dishes
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Align items vertically
    },
    dishText: {
        fontSize: 17,
        maxWidth: 120, // Set a maximum width for the dish text container
        overflow: 'hidden',
        textAlign: 'center',
    },
    deleteIcon: {
        height: 20,
        width: 20,
        marginLeft: 5, // Add space between text and delete icon
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
        paddingVertical: 16,
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
    nextImg:{
        marginLeft:'53%',
        marginTop:3,
        height:24,
        width:24,
    }
});
