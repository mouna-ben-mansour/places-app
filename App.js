import { StatusBar } from 'expo-status-bar';
import AllPlaces from "./screens/AllPlaces";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import IconButton from "./components/UI/IconButton";
import {Colors} from "./constants/colors";
import {useCallback, useEffect, useState} from "react";
import {init} from "./util/database";
import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen';
import PlaceDetails from "./screens/PlaceDetails";
const Stack = createNativeStackNavigator();
export default function App() {
  const [dbInit, setDbInit] = useState(false)
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        init();
      } catch (e) {
        console.warn(e);
      } finally {
        setDbInit(true)
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInit) {
      await SplashScreen.hideAsync();
    }
  }, [dbInit]);
  if(!dbInit){
    return null;
  }
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer onReady={onLayoutRootView}>
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
          <Stack.Screen name="Map" component={Map} options={{
            title: "Map"
          }}/>
          <Stack.Screen name="PlaceDetails" component={PlaceDetails}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}