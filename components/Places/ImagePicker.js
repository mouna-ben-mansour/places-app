import {Alert, Image, View, StyleSheet, Text} from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from 'expo-image-picker';
import {useState} from "react";
import {Colors} from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
function ImagePicker() {
    const [pickedImage, setPickedImage] = useState()
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    async function verifyPermission(){
        if( cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
           const permissionResponse = await requestPermission();
           return permissionResponse.granted;
        }
        if( cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!','You need to grant camera permissions to use this app.');
            return false;
        }

        return true;
    }
    async function takeImageHandler() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });
        setPickedImage(image.assets);
    }

    let imagePreview= <Text style={styles.previewText}>No image taken yet</Text>

    if (pickedImage){
        imagePreview = <Image source={{uri:pickedImage[0].uri}} style={styles.imageStyle}/>
    }
    return (
        <View>
            <View  style={styles.imagePreviewContainer}>
                {imagePreview}
            </View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    )
}
export default ImagePicker;

const styles=StyleSheet.create({
    imagePreviewContainer:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        height:200,
        backgroundColor: Colors.primary100,
        marginVertical:8,
        borderRadius:8,
    },
    previewText:{
        color: Colors.gray700,
    },
    imageStyle:{
        width:'100%',
        height:'100%',
    }
})