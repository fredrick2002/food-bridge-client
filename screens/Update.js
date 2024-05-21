import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, Modal } from 'react-native';

export default function Update({ route, navigation }) {

    const SERVER_IP = process.env.EXPO_PUBLIC_SERVER_IP;

    const [userData, setUserData] = useState(null);
    const [donor, setDonor] = useState(null);
    const number = userData ? userData.mobileNumber : '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataFromStorage = await AsyncStorage.getItem('userData');
                console.log(userDataFromStorage);
                setUserData(userDataFromStorage ? JSON.parse(userDataFromStorage) : null);
                axios.get(`http://${SERVER_IP}/api/donations/${number}`)
                    .then(response => {
                        setDonor(response.data.donor);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error('Error retrieving user data from AsyncStorage:', error);
            }
        };

        fetchData();

    }, []);


    const { location, name, mobileNumber, no_of_servings, dishes, food_category, meal_type } = donor;

    console.log(location.address);

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [showDonationContainer, setShowDonationContainer] = useState(true);
    // const [servings, setServings] = useState(values);
    const [showAlert, setShowAlert] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [moreOptionsPosition, setMoreOptionsPosition] = useState({ x: 0, y: 0 });

    const handleConfirm = () => {
        setIsOverlayVisible(true);
    }

    const handleConfirm1 = (event) => {
        const { pageX, pageY, locationX, locationY } = event.nativeEvent;
        const buttonWidth = 25; // Width of the more.png icon
        const modalOffsetX = 125; // Adjust the offset to position the modal to the left
        const modalOffsetY = -50; // Adjust the offset to move the modal upwards
        const xOffset = locationX + modalOffsetX; // Calculate the offset for positioning the modal
        const yOffset = locationY - modalOffsetY; // Adjust this offset according to your design
        const modalX = pageX - xOffset - buttonWidth; // Calculate the modal position relative to the button
        const modalY = pageY - yOffset; // Calculate the modal position relative to the button
        setMoreOptionsPosition({ x: modalX, y: modalY });
        setShowMoreOptions(true);
    };



    const chunkArray = (array, size) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    }

    const decrementServings = () => {
        setServings(prevServings => Math.max(prevServings - 10, 0));
    };

    const incrementServings = () => {
        setServings(prevServings => parseInt(prevServings, 10) + 10);
    };

    const updateServings = () => {
        const updatedParams = { ...route.params, servings: servings };
        setIsOverlayVisible(false);
        navigation.setParams(updatedParams);
    };

    const deleteDonation = () => {
        setIsOverlayVisible(false);
        setShowDonationContainer(false);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            setIsDeleted(true);
        }, 3000);
    };

    const undoDeletion = () => {
        setShowDonationContainer(true);
        setShowAlert(false);
        setIsDeleted(false);
    };

    const showOptions = () => {
        setShowMoreOptions(true);
    };

    const hideOptions = () => {
        setShowMoreOptions(false);
    };

    // const handleaddDonationpress = async () => {
    //     navigation.navigate('Homescreen', { name: name, location: address, number: number });
    //   };

    // useEffect(() => {
    //     if (isDeleted && !showDonationContainer) {
    //         navigation.navigate('Homescreen', { name: name, location: location, number: number });
    //     }
    // }, [isDeleted, showDonationContainer]);


    const addressParts = address.split(',');
    const formattedLocation = addressParts[0].trim();
    const maxLength = 45;
    const truncatedLocation = address.length > maxLength ? address.substring(0, maxLength) + '...' : address;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.currentContainer}>
                <Image source={require("../assets/arrow.png")} style={styles.locationImage} />
                <Text style={styles.userLocation}>{formattedLocation}</Text>
                <Image source={require("../assets/expand.png")} style={styles.expandImage} />
            </View>
            <Image source={require("../assets/account.png")} style={styles.usericon} />
            <Text style={styles.userfullLocation}>{truncatedLocation}</Text>

            {showDonationContainer && (
                <View style={styles.donationContainer}>
                    <View style={styles.donateContainer}>
                        <View style={styles.mainDetails}>
                            <View style={styles.rowContainer}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.donationtextContainer}>Donation 01</Text>
                                </View>
                                <View style={styles.moreContainer}>
                                    <TouchableOpacity style={styles.moreTouchable} onPress={(event) => handleConfirm1(event)}>
                                        <Image source={require("../assets/more.png")} style={styles.moreIcon} />
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                        <View style={styles.liteLine} />
                        <View style={styles.servingDetails}>
                            <Text style={styles.servingTitle}>{no_of_servings} Servings</Text>
                            <View style={styles.rowContainer}>
                                {/* Render the food category icon */}
                                {/* Render the category icon */}
                                {food_category && (
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
                                {meal_type && (
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

                                <View key={colIndex} style={styles.column}>
                                    {dishes.map((dish, index) => (
                                        <View key={index} style={styles.dishRow}>
                                            <Image source={require("../assets/arrowright.png")} style={styles.arrow} />
                                            <Text style={styles.dishname}>{dish}</Text>
                                        </View>
                                    ))}
                                </View>

                            </View>
                        </View>

                        {/* More Options Modal */}
                        <Modal visible={showMoreOptions} transparent animationType="fade">
                            <TouchableOpacity style={styles.modalContainer} onPress={hideOptions}>
                                {/* Opaque layer */}
                                <View style={styles.opaqueLayer1} />
                            </TouchableOpacity>
                            {showMoreOptions && (
                                <View style={[styles.moreOptionsContainer, { top: moreOptionsPosition.y, left: moreOptionsPosition.x }]}>
                                    <TouchableOpacity style={styles.optionButton} onPress={handleConfirm}>
                                        <Image source={require("../assets/edit1.png")} style={styles.optionIcon} />
                                        <Text style={styles.optionText}>Edit Donation</Text>
                                    </TouchableOpacity>
                                    <View style={styles.liteLine1} />
                                    <TouchableOpacity style={styles.optionButton} onPress={deleteDonation}>
                                        <Image source={require("../assets/delete1.png")} style={styles.optionIcon} />
                                        <Text style={styles.optionText}>Delete Donation</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Modal>





                        {/* Update Details button */}
                        <View style={styles.nextContainer}>
                            <TouchableOpacity style={styles.next} onPress={handleConfirm}>
                                <Text style={styles.textNext}>Update Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

            {/* Overlay */}
            <Modal visible={isOverlayVisible} transparent animationType="slide">
                <TouchableOpacity style={styles.overlay} onPress={() => setIsOverlayVisible(false)} >
                    {/* Opaque layer */}
                    <View style={styles.opaqueLayer} />
                    {/* Your overlay content goes here */}
                    <Image source={require("../assets/close_button.png")} style={styles.closeIcon} onPress={() => setIsOverlayVisible(false)} />
                    <View style={styles.overlayContent}>
                        {/* Close button */}

                        {/* Update servings text */}
                        <Text style={styles.updateServingsText}>Update the number of servings</Text>

                        {/* Horizontal line */}
                        <View style={styles.horizontalLine} />

                        {/* Servings input box */}
                        <View style={styles.servingsInputContainer}>
                            <TouchableOpacity style={styles.servingsButton} onPress={decrementServings}>
                                <Image source={require("../assets/minus.png")} style={styles.minusIcon} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.servingsInput}
                                value={servings.toString()}
                                onChangeText={setServings}
                                keyboardType="numeric"
                            />
                            <TouchableOpacity style={styles.servingsButton} onPress={incrementServings}>
                                <Image source={require("../assets/add.png")} style={styles.addIcon} />
                            </TouchableOpacity>

                            {/* Update servings button */}
                            <TouchableOpacity style={styles.updateButton} onPress={updateServings}>
                                <Text style={styles.updateButtonText}>Update Servings</Text>
                            </TouchableOpacity>

                        </View>
                        {/* Close donation button */}
                        <View style={styles.donationclosecontainer}>
                            <TouchableOpacity style={styles.closeDonationButton} onPress={deleteDonation}>
                                <Text style={styles.closeDonationButtonText}>Close Donation</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Alert */}
            {showAlert && (
                <View style={styles.alertContainer}>
                    <Text style={styles.alertText}>Donation deleted successfully</Text>
                    <TouchableOpacity style={styles.undoButton} onPress={undoDeletion}>
                        <Text style={styles.undoButtonText}>Undo</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Navbar */}
            <View style={styles.navbar}>
                <View>
                    <Image source={require("../assets/homepage.png")} style={styles.homeicon} />
                    <Text>Home</Text>
                </View>
                <TouchableOpacity onPress={handleaddDonationpress}>
                    <Image source={require("../assets/donateplus.png")} style={styles.donateplusicon} />
                    <Text style={styles.navtext}>Donate</Text>
                </TouchableOpacity>
                <View>
                    <Image source={require("../assets/message.png")} style={styles.messageicon} />
                    <Text style={styles.navtext}>Chat</Text>
                </View>
            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "white",
    },
    currentContainer: {
        paddingLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 10,
        position: "absolute"
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
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 20,
        marginTop: 15,
    },
    userfullLocation: {
        paddingTop: 5,
        paddingLeft: 26,
        color: "#707072",
        marginTop: 60
    },
    usericon: {
        width: 24,
        height: 24,
        marginTop: 45,
        marginLeft: 340,
        position: "absolute"
    },
    donationContainer: {
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    donateContainer: {
        borderColor: '#D1D5DB',
        borderWidth: 1,
        borderRadius: 16,
        paddingBottom: 16,
        paddingTop: 10
    },
    donationTitle: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 0,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        marginRight: 10, // Adjust the spacing between image and text content
    },
    textContainer: {
        flex: 1,
        marginRight: 15,
    },
    donationtextContainer: {
        fontSize: 18,
        fontWeight: "500",
    },
    timetextContainer: {
        fontSize: 14,
        fontWeight: "500",
        color: '#707072',
    },
    moreContainer: {
        marginRight: 20,
    },
    moreTouchable: {
        width: 30, // Adjust width and height as needed to cover the Image
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreIcon: {
        height: 25,
        width: 10,
        marginBottom: -20,
    },
    rowContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Add this to space the text and edit icon
    },

    editIcon1: {
        height: 20,
        width: 20,
        marginBottom: 10,
        marginRight: 10,
    },
    liteLine: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
    },
    mainDetails: {
        paddingLeft: 20
    },
    servingDetails: {
        paddingLeft: 20
    },
    servingTitle: {
        fontSize: 18,
        fontWeight: "500",
    },
    vegIcon: {
        height: 29.5,
        width: 76,
    },
    nonVegIcon: {
        height: 29.5,
        width: 106.5,
    },
    bothIcon: {
        height: 29.5,
        width: 80,
    },
    breakfastIcon: {
        height: 30,
        width: 113.5,
        marginLeft: 20,
    },
    lunchIcon: {
        height: 30,
        width: 91,
        marginLeft: 20,
    },
    dinnerIcon: {
        height: 30,
        width: 94,
        marginLeft: 20,
    },
    dishesTitle: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 10,
    },
    dishCount: {
        color: '#6B7280',
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
    arrow: {
        height: 20,
        width: 20,
        marginBottom: 5,
    },
    dishname: {
        fontSize: 16,
        marginBottom: 5,
        paddingLeft: 5,
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
        marginTop: 10
    },
    donateplusicon: {
        height: 24,
        width: 24,
        marginTop: 10,
        marginLeft: 8,
    },
    messageicon: {
        height: 24,
        width: 24,
        marginTop: 10
    },
    navtext: {
        color: "#8F9092",
    },
    nextContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 6, // Add some padding to separate the button from the dishes
        marginTop: 16,
    },
    next: {
        paddingVertical: 12,
        paddingHorizontal: 95,
        borderColor: "#3468C0",
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    textNext: {
        fontSize: 18,
        color: "#3468C0",
        alignSelf: "center",
        marginLeft: 10,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    opaqueLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeIcon: {
        height: 40,
        width: 40,
        marginBottom: 16,
    },
    minusIcon: {
        height: 25,
        width: 25,
        marginBottom: 10,
        marginTop: 5,
    },
    addIcon: {
        height: 25,
        width: 25,
        marginBottom: 10,
        marginTop: 5,
    },
    overlayContent: {
        backgroundColor: 'white',
        width: '98%',
        paddingVertical: 16,
        paddingHorizontal: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    servingsInputContainer: {
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Align items vertically
        marginBottom: 16, // Add some margin to separate from other elements
        paddingHorizontal: 16,
        marginTop: 16,
    },
    updateServingsText: {
        fontSize: 20,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    horizontalLine: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
    },
    servingsInput: {
        fontSize: 18,
        height: 35,
        width: 'auto', // or width: '100%' 
        color: '#0261FF',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ADABAB',
        textAlign: 'center',
        marginHorizontal: 16,
    },
    updateButton: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#0261FF',
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 34,
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 16,
    },

    updateButtonText: {
        fontSize: 18,
        color: '#0261FF',
    },
    donationclosecontainer: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    closeDonationButton: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#1CA672',
        backgroundColor: 'white',
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
    },
    closeDonationButtonText: {
        fontSize: 18,
        color: '#1CA672',
    },
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 80, // Add padding to the bottom to lift the navbar above the screen edge
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#322F35', // Adjust as needed
        borderRadius: 4,
        marginHorizontal: 8,
    },
    alertText: {
        color: "white",
        fontSize: 16,
        paddingVertical: 16,
    },
    undoButton: {
        position: 'absolute',
        right: 5,
        padding: 16,
        borderRadius: 5,
    },
    undoButtonText: {
        color: '#D0BCFF',
        fontSize: 18,
    },
    moreOptionsContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        left: 10,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    optionIcon: {
        width: 16,
        height: 16,
        marginRight: 10,
        marginLeft: 10,
    },
    optionText: {
        fontSize: 16,
    },
    liteLine1: {
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    opaqueLayer1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
