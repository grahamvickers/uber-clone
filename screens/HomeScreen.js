import { Image, SafeAreaView, Text, View } from 'react-native'
import React from 'react';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-white h-full p-20">
        <View className="p-5">
            <Image 
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                }}
                source={{
                    uri: "https://links.papareact.com/gzs"
                }}
            />

            <GooglePlacesAutocomplete 
                placeholder='Where From?'
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
            />

            <NavOptions />
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen;
