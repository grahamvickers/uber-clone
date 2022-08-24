import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // variables for the time base prompt
    let timeOfDay;
    const date = new Date();
    const hours = date.getHours();

    // if else time based greeting
    if (hours < 12) {
        timeOfDay = 'morning';
        } else if (hours >= 12 && hours < 17) {
        timeOfDay = 'afternoon';
        } else {
        timeOfDay = 'night';
        }

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
        <TouchableOpacity 
            onPress={() => navigation.navigate("HomeScreen")}
            style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
        >
            <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>  
      <Text style={tw`text-center py-5 text-xl`}>Good {timeOfDay}, Graham!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
            {/* this is the input field for setting a destination */}
            <GooglePlacesAutocomplete 
                placeholder="Where to?"
                styles={twoInputBoxStyles}
                fetchDetails={true}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                minLength={2}
                onPress={(data, details = null) => {
                    dispatch(
                        setDestination({
                            location: details.geometry.location,
                            description: data.description,
                        })
                    );
                    navigation.navigate("RideOptionsCard")
                }}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: "en",
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
            />
        </View>

        {/* add in the favorite locations for the rider */}
        <NavFavorites/>
      </View>
    
        {/* this shows the user a choice between now selecting a ride from this location or food to here */}
      <View style={tw`flex-row bg-white justify-evenly py-2 pb-7 mt-auto border-t border-gray-100`}>
        {/* ride */}
        <TouchableOpacity 
            onPress={() => navigation.navigate("RideOptionsCard")}
            style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        
        {/* eats */}
        <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
            <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
            <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default NavigateCard;

const twoInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
});