import {View, StyleSheet, Alert, Image, Text} from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import {Colors} from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions } from "expo-location";
import {PermissionStatus, useCameraPermissions} from "expo-image-picker";
import {useEffect, useState} from "react";
import {getMapPreview} from "../../util/location";
import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";

function LocationPicker() {
    const navigation = useNavigation();
    const route = useRoute();
    const [pickedLocation, setPickedLocation] = useState()
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    const isFocused = useIsFocused();

    useEffect(()=> {
        if (isFocused && route.params) {
            const mapPickedLocation =  {lat : route.params.pickedLat , lng: route.params.pickedLng};
            setPickedLocation(mapPickedLocation);
        }
    },[route, isFocused]);
    async function verifyPermission(){
        if( locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if( locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!','You need to grant location permissions to use this app.');
            return false;
        }

        return true;
    }
    async function locateUserHandler(){
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
       const location = await getCurrentPositionAsync();
       setPickedLocation({
           lat: location.coords.latitude,
           lng: location.coords.longitude
       });
    }
    function pickOnMapHandler(){
        navigation.navigate('Map');
    }

    let mapPreview= <Text style={styles.previewText}>No location picked yet</Text>

    if (pickedLocation){
        mapPreview = <Image source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} style={styles.mapStyle}/>
    }
    return (
        <View>
            <View style={styles.mapPreview}>
                {mapPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={locateUserHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>

        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:200,
        backgroundColor: Colors.primary100,
        marginVertical:8,
        borderRadius:8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    previewText:{
        color: Colors.gray700,
    },
    mapStyle:{
        width:'100%',
        height:'100%',
        borderRadius:8,
    }
})