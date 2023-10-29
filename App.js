import { StatusBar } from 'expo-status-bar';
import AllPlaces from "./screens/AllPlaces";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import {Colors} from "./constants/colors";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary700},
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.primary50}
        }}>
          <Stack.Screen name="AllPlaces" component={AllPlaces} options={({navigation}) => ({
            headerRight: ({tintColor})=>{
              return <IconButton icon='add' color={tintColor} size={18} onPress={()=>{navigation.navigate('AddPlace')}}/>
            },
            title: "Your Favorite Places"
          })}/>
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title: "Add a new Place"
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}