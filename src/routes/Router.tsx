import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";


export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
  };

const Stack = createNativeStackNavigator();

export default function Router(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
    )
}