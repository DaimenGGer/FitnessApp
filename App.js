import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { TailwindProvider } from "tailwindcss-react-native";
import { auth } from "./Firebase";
import AuthStack from "./navigator/AuthStack";
import TabNavigator from "./navigator/TabNavigator";
import { store } from "./redux/app/store";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import FitScreen from "./screens/FitScreen";
import RestScreen from "./screens/RestScreen";

const Stack = createNativeStackNavigator();
const NavWor = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Workout"
        options={{ headerShown: false }}
        component={WorkoutScreen}
      />
      <Stack.Screen
        name="Fit"
        options={{ headerShown: false }}
        component={FitScreen}
      />
      <Stack.Screen
        name="Rest"
        options={{ headerShown: false }}
        component={RestScreen}
      />
    </Stack.Navigator>
  )
 }
export default function App() {
  return (
    <>
    <Provider store={store}>
      <NavigationContainer>
        <TailwindProvider>
          <StatusBar style="dark" />
          {/* {auth.authUser ? <NavWor />  : <AuthStack />} */}
          {auth.authUser ? <TabNavigator /> : <AuthStack />}
        </TailwindProvider>
      </NavigationContainer>
    </Provider>
    </>
  );
}
// && <NavWor />

