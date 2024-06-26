import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Linking } from 'react-native';

export default function CardDetails({ route, navigation }) {
    const { id } = route.params;
    const SERVER_IP = process.env.EXPO_PUBLIC_SERVER_IP;
    const [donationData, setDonationData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://${SERVER_IP}/donationDetails?id=${id}`);
                const data = await response.json();
                setDonationData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);


    const handlePress = () => {
        navigation.navigate('reciverHomescreen');
    }
    if (!donationData) {
        return <Text>Loading...</Text>;
    }
    const handleCallPress = () => {
        if (donationData && donationData.mobileNumber) {
            Linking.openURL(`tel:${donationData.mobileNumber}`);
        }
    };
    const { no_of_servings, food_category, dishes, name, mobileNumber, location } = donationData;
    return (
        <>
            <View style={styles.cardContainer}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={require("../assets/keyboard_backspace.png")} style={styles.back} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Donation 01</Text>
                    <View style={styles.container}>
                        <Image source={require("../assets/servingcount.png")} style={styles.servingsIcon1} />
                        <Text style={styles.servings}> {no_of_servings} Servings</Text>
                        <Text style={styles.servingsDescription}>{food_category} | {dishes.length} Dishes</Text>

                        <View style={styles.line} />
                        <View style={styles.person}>
                            <Image source={require("../assets/person.png")} style={styles.cardIcons1} />
                            <Text style={styles.personName}>{name}</Text>
                            <Image source={require("../assets/call.png")} style={styles.cardIcons2} />
                            <Text style={styles.personDescription}>{mobileNumber}</Text>
                            <Image source={require("../assets/location.png")} style={styles.cardIcons3} />
                            <Text style={styles.personDescription}>{location.address}</Text>
                        </View>
                        <View style={styles.line} />

                        <View style={styles.Dishes}>
                            <Text style={styles.dishesTitle}>Dishes ({dishes.length})</Text>
                            {dishes.map((dish, index) => (
                                <View key={index} style={styles.dishItem}>
                                    <Image source={require("../assets/Dishes.png")} style={styles.dishesIcon} />
                                    <Text style={styles.dishesName}>{dish}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                </View>
                <View>
                    <TouchableOpacity onPress={handleCallPress}>
                        <Text style={styles.chat}>Call now</Text>
                        <Image source={require("../assets/next.png")} style={styles.next} />
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        flex: 0.95,

    },
    nav: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 50,
        paddingLeft: 20
    },
    back: {
        marginTop: 8,
        // marginLeft: ,
        marginTop: 10,
        position: "absolute",
        height: 22,
        width: 22,
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 25,
        marginTop: 5

    },
    container: {
        width: 350,
        height: 550,
        // backgroundColor: 'lightgray',
        borderColor: "#ADABAB",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        color: "#ADABAB",
        marginTop: 30,
        marginBottom: 0
    },
    servingsIcon1: {
        width: 24,
        height: 24,
        marginTop: 20,
        marginLeft: 20,
        position: "absolute"
    },
    servings: {
        paddingLeft: 53,
        fontSize: 20,
        fontWeight: "500",
        paddingBottom: 14,
        paddingTop: 18
    },
    servingsDescription: {
        paddingLeft: 53,
        paddingBottom: 12,
    },
    line: {
        borderWidth: 1,
        borderStyle: 'dotted',
        borderRadius: 1, // Adjust as needed
        borderColor: '#ADABAB',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 24,
        marginBottom: 24
    },
    person: {},
    cardIcons1: {
        width: 20,
        height: 20,
        marginTop: 2,
        marginLeft: 20,
        position: "absolute"
    },
    personName: {
        fontWeight: "500",
        paddingLeft: 53,
        paddingBottom: 25,
        fontSize: 20,
    },

    personDescription: {
        paddingLeft: 53,
        paddingBottom: 20,
    },
    cardIcons2: {
        width: 20,
        height: 20,
        marginTop: 50,
        marginLeft: 20,
        position: "absolute"
    },
    cardIcons3: {
        width: 20,
        height: 20,
        marginTop: 90,
        marginLeft: 20,
        position: "absolute"
    },
    Dishes: {
        paddingLeft: 30,
    },
    dishesTitle: {
        fontSize: 16,
        paddingBottom: 20,
    },
    dishesIcon: {
        width: 20,
        height: 20,
        position: "absolute",

    },
    dishesName: {
        paddingLeft: 20,
        paddingBottom: 10,
    },
    chat: {
        backgroundColor: "#3468C0",
        color: "white",
        alignSelf: "center",
        paddingVertical: 10,
        paddingHorizontal: 140,
        borderRadius: 10,
        fontSize: 16,
        position: "absolute"
    },
    next: {
        width: 20,
        height: 20,
        marginLeft: 240,
        marginTop: 11
    }
});