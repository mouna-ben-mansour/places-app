import {Pressable, View, StyleSheet, Text} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Colors} from "../../constants/colors";

function OutlinedButton({icon, onPress, children}) {
    return (
        <Pressable onPress={onPress} style={(pressed)=>[styles.button, pressed && styles.pressed]}>
            <Ionicons style={ styles.icon } name={icon} color={Colors.primary500} size={18}/>
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    )
}

export default OutlinedButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: Colors.primary500
    },
    pressed:{
        opacity: 0.75
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: Colors.primary500
    }

})