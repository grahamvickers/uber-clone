import { View, Text, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

// car options data array
const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https:/links.papareact.com/3pn"
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https:/links.papareact.com/5w8"
    },
    {
        id: "Uber-Black-123",
        title: "Uber Black",
        multiplier: 1.75,
        image: "https:/links.papareact.com/7pf"
    },
];

// set a static surge charge rate
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
        {/* back button and section header */}
        <View>
            <TouchableOpacity 
                onPress={() => navigation.navigate("NavigateCard")}
                style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
            >
                <Icon name="chevron-left" type="fontawesome" />
            </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>
                Select a Ride - {travelTimeInformation?.distance?.text}
            </Text>
        </View>

        {/* render the data above in a dynamic list */}
        <FlatList data={data} keyExtractor={(item) => item.id}
            renderItem={({item: { id, title, multiplier, image }, item}) => (
                // on press will select the ride and further the users progression to confirming
                <TouchableOpacity 
                    onPress={() => setSelected(item)}
                    style={tw`flex-row justify-between items-center px-10 
                    ${id === selected?.id && "bg-gray-200"}`}
                >   
                    {/* car icons */}
                    <Image 
                        style={{ width: 100, height: 100, resizeMode: "contain"}}
                        source={{ uri: image}}
                    />

                    {/* car type and time of trip */}
                    <View style={tw`-ml-6`}>
                        <Text style={tw`text-xl font-semibold`}>{title}</Text>
                        <Text>{travelTimeInformation?.duration?.text} ride</Text>
                    </View>

                    {/* calculate the cost of the ride */}
                    <Text style={tw`text-xl`}>
                        {new Intl.NumberFormat('en-ca', {
                          style: "currency",
                          currency: "CAD" , 
                        }).format(
                            (travelTimeInformation?.duration?.value * 
                                SURGE_CHARGE_RATE *
                                 multiplier) / 
                                 100
                        )}
                    </Text>
                </TouchableOpacity>
            )}
        />

        {/* this creates the choose/ confirm ride button */}
        <View style={tw`mt-auto border-t border-gray-200`}>
            <TouchableOpacity 
                // onPress={() => nav}
                disabled={!selected} 
                style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
            >
                <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard