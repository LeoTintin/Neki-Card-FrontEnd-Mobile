import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Routes from "./src/routes";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor:"#ece8cb"}}>
      <Routes />
      <StatusBar />
      <Toast />
    </View>
  );
}
