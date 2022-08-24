import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    // zoom out map when the origin and destination are both set
    useEffect(() => {
        if (!origin || !destination) return;

        // zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50},
        });
    }, [origin, destination])

    // this query will calculate the travel distance and the time of the ride
    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?
                units=imperial&origins=${origin.description}&destinations=
                ${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
            ).then((res) => res.json())
            .then(data => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                // console.log(data)
            });
        };

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);


  return (
    <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
        initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
        }}
    >   
        {/* create directions between origin and destination*/}
        {origin && destination && (
            <MapViewDirections
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="black"
            />
        )}

        {/* sets the pick up marker location on the map */}
        {origin?.location && (
            <Marker
                pinColor='green'
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title="Pick up"
                description={origin.description}
                identifier="origin"
            />
        )}

        {/* sets the destination marker on the map */}
        {destination?.location && (
            <Marker
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                title="Drop off"
                description={destination.description}
                identifier="destination"
            />
        )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({})