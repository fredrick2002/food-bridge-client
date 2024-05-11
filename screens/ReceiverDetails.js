import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';



export default function ReceiverDetails({ route, navigation }) {
    
    const SERVER_IP = process.env.EXPO_PUBLIC_SERVER_IP;

    const { name, mobileNumber: mobileNumber, email:email, userType:userType, password:password } = route.params;
    const [orgName, setOrgName] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [address, setAddress] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    console.log(SERVER_IP);

    const handlePress = () => {
        
        if (name && mobileNumber && selectedOption && orgName && licenseNumber && address) {
            fetch(`http://${SERVER_IP}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobileNumber: mobileNumber,
                    password: password, // Ensure this is securely handled and encrypted
                    userType: userType
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                navigation.navigate('ReceiverLocation', {
                    name: name,
                    mobileNumber: mobileNumber,
                    email: email,
                    userType: userType,
                    typeOfOrg: selectedOption,
                    orgName: orgName,
                    licenseNumber: licenseNumber,
                    address: address
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            Alert.alert('Incomplete Details', 'Please fill in all the details');
        }
    };
    

    const handleDropdownSelect = (option) => {
        setSelectedOption(option);
        setDropdownVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.baseText}>Enter your details</Text>
            <View style={styles.inner}>
                <Text style={styles.inputHeader}>Type of Organization</Text>
                <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    <TextInput
                        style={[styles.input, selectedOption ? styles.selectedInput : null]}
                        placeholder="Choose your organization type"
                        value={selectedOption}
                        onChangeText={setOrgName}
                        editable={false} // Prevents direct text input
                    />
                    <Image source={require("../assets/expand.png")} style={styles.expandImage} />
                </TouchableOpacity>
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleDropdownSelect('NGO')}
                        >
                            <Text style={styles.dropdownText}>NGO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleDropdownSelect('Orphanage')}
                        >
                            <Text style={styles.dropdownText}>Orphanage</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleDropdownSelect('Old age home')}
                        >
                            <Text style={styles.dropdownText}>Old age home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleDropdownSelect('Children`s home')}
                        >
                            <Text style={styles.dropdownText}>Children`s home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => handleDropdownSelect('Other')}
                        >
                            <Text style={styles.dropdownText}>Other</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {selectedOption === 'NGO' && (
                    <>
                        <Text style={styles.inputHeader}>NGO name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter your NGO's name here"
                            value={orgName}
                            onChangeText={setOrgName}
                        />
                        <Text style={styles.inputHeader}>NGO License Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter your license Number here"
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                            keyboardType="numeric"
                        />
                        <Text style={styles.inputHeader}>NGO Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter the NGO’s address here"
                            value={address}
                            onChangeText={setAddress}
                        />
                    </>
                )}
                {selectedOption === 'Old age home' && (
                    <>
                        <Text style={styles.inputHeader}>Old age home name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter your Old age home's name here"
                            value={orgName}
                            onChangeText={setOrgName}
                        />
                        <Text style={styles.inputHeader}>Old age home License Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter your license Number here"
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                            keyboardType="numeric"
                        />
                        <Text style={styles.inputHeader}>Old age home Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter the Old age home's address here"
                            value={address}
                            onChangeText={setAddress}
                        />
                    </>
                )}
                {selectedOption === 'Orphanage' && (
                    <>
                        <Text style={styles.inputHeader}>Orphanage name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter your Orphanage name here"
                            value={orgName}
                            onChangeText={setOrgName}
                        />
                        <Text style={styles.inputHeader}>Orphanage License Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter your license Number here"
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                            keyboardType="numeric"
                        />
                        <Text style={styles.inputHeader}>Orphanage Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter the Orphanage address here"
                            value={address}
                            onChangeText={setAddress}
                        />
                    </>
                )}
                {selectedOption === 'Children`s home' && (
                    <>
                        <Text style={styles.inputHeader}>Children`s home name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter your Children`s home name here"
                            value={orgName}
                            onChangeText={setOrgName}
                        />
                        <Text style={styles.inputHeader}>Children`s home License Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter your license Number here"
                            value={licenseNumber}
                            onChangeText={setLicenseNumber}
                            keyboardType="numeric"
                        />
                        <Text style={styles.inputHeader}>Children`s home Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter the Children`s home address here"
                            value={address}
                            onChangeText={setAddress}
                        />
                    </>
                )}
            </View>

            <View style={styles.nextContainer}>
                <TouchableOpacity style={styles.next} onPress={handlePress}>
                    <Text style={styles.textNext}>Next</Text>
                    <Image source={require("../assets/next.png")} style={styles.nextImg} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    baseText: {
        color: 'black',
        fontSize: 21,
        fontWeight: '500',
        marginTop: 26,
    },
    inner: {
        flex: 1,
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        fontSize: 16,
        padding: 10,
        paddingHorizontal: 16,
        borderColor: '#B8BBC2',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 16,
    },
    selectedInput: {
        color: 'black', // Set text color to black when an option is selected
    },
    inputHeader: {
        color: '#1D1D1D',
        fontSize: 18,
        marginTop: 20,
        paddingBottom: 10,
    },
    expandImage: {
        position: 'absolute',
        top: '35%',
        right: 12,
        transform: [{ translateY: -8 }],
        width: 24,
        height: 20,
    },
    dropdown: {
        position: 'absolute',
        top: 100, // Adjust as needed to position the dropdown
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#B8BBC2',
        borderWidth: 1,
        zIndex: 1, // Ensure it's above other elements
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownText: {
        fontSize: 16,
        color: '#1D1D1D',
    },
    nextContainer: {
        marginTop: 'auto', // Push the container to the bottom
        alignSelf: 'stretch', // Make sure the container stretches across the screen
        alignItems: 'center', // Center the button horizontally
        marginBottom: 6, // Add a margin at the bottom
    },
    next: {
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
    textNext: {
        position: "absolute",
        fontSize: 18,
        color: "#FFFFFF",
        alignSelf: "center",
        marginTop: 16,
        marginLeft: '40%',
    },
    nextImg: {
        marginLeft: '53%',
        marginTop: 3,
        height: 24,
        width: 24,
    }
});
