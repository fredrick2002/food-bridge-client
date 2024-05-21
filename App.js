import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screens/Welcome'; 
import Roles from './screens/Roles'; // Import your Screen2 component here
import DonorLocation from './screens/DonorLocation';
import HomeScreen from './screens/HomeScreen'; 
import EnterDetails from './screens/EnterDetails';
import EnterDishes from './screens/EnterDishes';
import Confimation from './screens/Confirmation';
import Success from './screens/Success';
import Update from './screens/Update';
import ReceiverDetails from './screens/ReceiverDetails';
import ReceiverLocation from './screens/ReceiverLocation';
import ReceiverHomeScreen from './screens/ReceiverHomescreen';
import CardDetails from './screens/CardDetails';
import DonorLogin from './screens/DonorLogin';
import ReceiverLogin from './screens/ReceiverLogin';
import Login from './screens/Login';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
  <Stack.Screen name="Roles" component={Roles}  options={{ headerShown: false }}/>
  <Stack.Screen name='DonorLogin' component={DonorLogin} options={{headerShown: false}}/>
  <Stack.Screen name='ReceiverLogin' component={ReceiverLogin} options={{headerShown: false}}/>
  <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
  <Stack.Screen name="DonorLocation" component={DonorLocation}  options={{ headerShown: false }}/>
  <Stack.Screen name= "HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
  <Stack.Screen name= "EnterDetails" component={EnterDetails} options={{headerShown: false}}/>
  <Stack.Screen name='EnterDishes' component={EnterDishes} options={{headerShown: false}}/>
  <Stack.Screen name='Confirmation' component={Confimation} options={{headerShown: false}}/>
  <Stack.Screen name='Success' component={Success} options={{headerShown: false}}/>
  <Stack.Screen name='Update' component={Update} options={{headerShown: false}}/>
  <Stack.Screen name='ReceiverDetails' component={ReceiverDetails} options={{headerShown: false}}/>
  <Stack.Screen name='ReceiverLocation' component={ReceiverLocation} options={{headerShown: false}}/>
  <Stack.Screen name='ReceiverHomescreen' component={ReceiverHomeScreen} options={{headerShown: false}}/>
  <Stack.Screen name='CardDetails' component={CardDetails} options={{headerShown: false}}/>
  <Stack.Screen name='ChatScreen' component={ChatScreen} options={{headerShown: false}}/>
  </Stack.Navigator>
  </NavigationContainer>
  );
}

