import {View, StyleSheet, ScrollView, Text, Image} from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import {Colors} from "../constants/colors";
import {useEffect, useState} from "react";
import {getPlaceDetails} from "../util/database";

function PlaceDetails({navigation, route}) {
    const selectedPlaceId = route.params.placeId;
    const [selectedPlace, setSelectedPlace] = useState({})
    function showOnMapHandler() {

    }
    useEffect(() => {
       async  function getSelectedPlace(){
           const place = await getPlaceDetails(selectedPlaceId);
           setSelectedPlace(place);
           navigation.setOptions({
               title: selectedPlace.title
           })
       }
        getSelectedPlace();
    }, [selectedPlaceId]);
    if(!selectedPlace) {
        return (
            <View style={styles.fallback}>
                <Text>Loading place data...</Text>
            </View>
        )
    }
    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedPlace.imageUri}}/>
            <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{selectedPlace.address}</Text>
            </View>
            <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
            </View>
        </ScrollView>
    )
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },

})