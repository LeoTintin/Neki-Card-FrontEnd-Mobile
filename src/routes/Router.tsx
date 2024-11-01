import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import UpdatePerfil from "../screens/UpdatePerfil";
import SpecificUser from "../screens/SpecificUser";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Update: any;
  Specific: any;
};

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Update" component={UpdatePerfil} />
      <Stack.Screen name="Specific" component={SpecificUser} />
    </Stack.Navigator>
  );
}
