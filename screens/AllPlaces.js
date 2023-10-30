import {StyleSheet} from "react-native";
import PlacesList from "../components/Places/PlacesList";
import {useIsFocused} from "@react-navigation/native";
import {useEffect, useState} from "react";

function AllPlaces({route}) {
    const [places, setPlaces] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        if(isFocused && route.params){
            setPlaces(currentPlaces => [...currentPlaces, route.params.place]);
        }
    }, [isFocused,route]);
    return <PlacesList places={places}/>
}
export default AllPlaces;

const styles = StyleSheet.create({

})