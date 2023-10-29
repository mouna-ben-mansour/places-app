import {StyleSheet, View, Text, ScrollView, TextInput} from "react-native";
import {useState} from "react";
import {Colors} from "../constants/colors";

function PlaceForm() {
    const [enteredTitle, setEnteredTitle] = useState('');
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }
    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput onChangeText={changeTitleHandler} value={enteredTitle} style={styles.input}/>
            </View>

        </ScrollView>
    )
}
export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})