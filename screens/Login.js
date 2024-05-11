import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity, TextInput, Alert, Image } from 'react-native';


export default function Login({ navigation }) {

    const handleSignPress = () => {
        navigation.navigate('Screen1')
    }
    return(
        <>
        <SafeAreaView style = {styles.Container}>
            <View>
                <Text style = {styles.title}>Welcome back</Text>
                <View>
                    <Text style = {styles.input}>Mobile Number</Text>
                    <View style = {styles.inputContainer}>
                    <TextInput
                    style={styles.inputBox}
                    placeholder="enter your mobile number here"
                    keyboardType="Numeric"/>
                    </View>
                    
                    <Text style={styles.input}>Password</Text>
                    <View style = {styles.inputContainer}>
                    
                    <TextInput
                        style={styles.inputBox}
                        placeholder="Enter your password here"
                        secureTextEntry={true}
                    />
                    <Image
                    source={require('./assets/show.png')}
                    style={styles.placeholderImage}
                    />
                    </View>
                    <Text style = {styles.innerTexts}>Forgot password</Text>

                </View>
                <View style = {styles.containerLogin}>
                <Text style = {styles.text}>Don’t have an account ? <Text onPress={handleSignPress} style = {styles.innerText} >Sign up here</Text></Text>
            </View>
            </View>
            <TouchableOpacity onPress={handleSignPress}>
                <View style = {styles.button}>
                <Text style = {styles.buttonText}>Login</Text>
                </View>
                
            </TouchableOpacity>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    Container:{
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 50,
        backgroundColor: 'white',
        paddingLeft:20,
        paddingRight:20,
    },
    title:{
        color: '#3468C0',
        fontSize: 30,
        fontWeight: '700',
        marginTop:24,
      },
    input:{
        fontSize:16,
        paddingBottom:10,
        paddingTop:24,
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
      inputBox:{
        flex: 1,
        height: 40,
        color: '#969698',
        paddingHorizontal: 10,
        fontSize: 16,
      },
      placeholderImage:{
        width: 20,
        height: 20,
        marginRight: 0,
        // position:"absolute",
      },
      containerLogin:{
        paddingTop:20,
        justifyContent : "center",
        alignItems: "center"
      },
      text:{
        color:'#5A5959',
      },
      innerTexts:{
        paddingTop:10,
        color: '#3468C0',
      },
      innerText:{
        color: '#3468C0',
      },
      button:{
        padding:20,
        backgroundColor:'#3468C0',
        
        marginTop:380,
        alignItems:"center",
        borderRadius:10,
      },
      buttonText:{
        color:'white',
        fontSize:16,
      }
})
