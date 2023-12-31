import {Text, View, StyleSheet, Alert} from "react-native";
import MapView , { Marker } from 'react-native-maps';
import {useCallback, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
function Map({navigation, route}) {
    const initialLocation = route.params && {lat: route.params.initialLat, lng: route.params.initialLng};
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    const region = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng :-122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    function selectLocationHandler(event) {
        if(initialLocation){
            return;
        }
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat: lat, lng: lng })
    }
    
    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert('No location picked!','You have to pick a location (by tapping on the map) first!');
            return;
        }
        navigation.navigate('AddPlace', {pickedLat:selectedLocation.lat, pickedLng: selectedLocation.lng});
    },[navigation,selectedLocation, initialLocation])

    useLayoutEffect(() => {
        if(initialLocation){
            return;
        }
        navigation.setOptions({
            headerRight: ({tintColor})=>{
                return <IconButton icon='save' color={tintColor} size={18} onPress={savePickedLocationHandler}/>
            },
        });
    }, [navigation, savePickedLocationHandler]);

    return (
        <MapView initialRegion={region} style={styles.map} onPress={selectLocationHandler}>
            { selectedLocation && (
                <Marker
                    title="Picked Location"
                    coordinate={{
                        latitude: selectedLocation.lat ? selectedLocation.lat : 0,
                        longitude: selectedLocation.lng ? selectedLocation.lng : 0
                    }}
                />
            )}
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})