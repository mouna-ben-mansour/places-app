import {StyleSheet} from "react-native";
import PlacesList from "../components/Places/PlacesList";
import {useIsFocused} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {getPlaces} from "../util/database";

function AllPlaces({route}) {
    const [places, setPlaces] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        async function getAllPlaces() {
            const AllPlaces = await getPlaces();
            setPlaces(AllPlaces);
        }

        if(isFocused){
            getAllPlaces();
            //setPlaces(currentPlaces => [...currentPlaces, route.params.place]);
        }
    }, [isFocused]);
    return <PlacesList places={places}/>
}
export default AllPlaces;

const styles = StyleSheet.create({

})