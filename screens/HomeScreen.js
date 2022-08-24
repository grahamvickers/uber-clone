import { Image, SafeAreaView, Text, View } from 'react-native'
import React from 'react';
import NavOptions from '../components/NavOptions';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';


const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                {/* header logo */}
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

                {/* this is the input field on the home screen that sets the pick up location */}
                <GooglePlacesAutocomplete 
                    placeholder='Where From?'
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18
                        }
                    }}
                    // set the data of the selected location on press
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        }))

                        dispatch(setDestination(null));
                        // console.log(data);
                        // console.log(details);
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                {/* add in the choice between uber ride or uber eats */}
                <NavOptions />
                
                {/* shows a demo of the users favorite locations */}
                <NavFavorites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;
