import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions, useNavigation } from '@react-navigation/native';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from 'react-native-elements';

const MapScreen = () => {
    const Stack = createStackNavigator();
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity 
            onPress={() => navigation.navigate("HomeScreen")}
                style={tw`absolute top-16 left-8 bg-gray-100 z-50 p-3 rounded-full shadow-lg`}
            >
                <Icon name="menu" />
            </TouchableOpacity>
        <View style={tw`h-1/2`}>
            {/* add the map component */}
            <Map />
        </View>

        <View style={tw`h-1/2`}>
            {/* using a stack navigator here allows for seamless transition and switching of screens from 
            setting the destination and selecting your car type choices*/}
            <Stack.Navigator>
                <Stack.Screen 
                  name="NavigateCard"
                  component={NavigateCard}
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="RideOptionsCard"
                  component={RideOptionsCard}
                  options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </View>
        </View>
    );
};

export default MapScreen;