import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

export default function Success({route, navigation}){
    const { location, name, number, values, dishes, selectedCategory, selectedMealType } = route.params;

    const handleDone = () => {
        navigation.navigate('Update', { name: name, location: location, number: number, values: values, dishes: dishes });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("../assets/success.png")} style={styles.successImg}/>
            <View style={styles.successDescriptionContainer}>
                <Text style={styles.successDescription}>
                    Thank you for posting your donation.{'\n'}
                    A suitable receiver will be in touch with you shortly.
                </Text>
            </View>
            <View style={styles.nextContainer}>
                <TouchableOpacity style={styles.next} onPress={handleDone}>
                    <Text style={styles.textNext}>Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: 'white',
    },
    successImg:{
        alignSelf: 'center',
        marginTop:'40%',
        height:200,
        width:200,
    },
    successDescriptionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        paddingLeft:20,
        paddingRight:20,
    },
    successDescription: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
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
