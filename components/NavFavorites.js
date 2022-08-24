import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

// set demo data of a users favorite locations
const data = [
    {
        id: "123", 
        icon: "home",
        location: "Home",
        destination: "98 Talbot St, London, Ontario"
    },
    {
        id: "456", 
        icon: "briefcase",
        location: "Work",
        destination: "1280 Oxford St, London, Ontario"
    }
]

const NavFavorites = () => {
  return (
    // returns the data dynamically on the home and destination screens
    <FlatList  
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
            <View
                style={[tw`bg-gray-200`, { height: 0.5 }]}
            />
        )}
        renderItem={({ item: { location, destination, icon } }) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
                <Icon
                    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name={icon}
                    type="ionicon"
                    color="white"
                    size={18}
                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={tw`text-gray-500`}>{destination}</Text>
                </View>
            </TouchableOpacity>
        )}
    />
  )
}

export default NavFavorites

const styles = StyleSheet.create({})