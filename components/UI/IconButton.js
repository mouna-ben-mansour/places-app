import {Pressable, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function IconButton({icon, size, color, onPress}) {
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
            <Ionicons name={icon} size={size} color={color}/>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    button:{
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed:{
        opacity: 0.75
    }
})