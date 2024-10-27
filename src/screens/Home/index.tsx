import { Text } from "react-native";
import { HomeButton, HomeView, HomeContainer, PerfiList, PerfilTitle } from "./styles";
import PerfilCard from "../../Components/PerfilCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Router";
import { useNavigation } from "@react-navigation/native";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList,"Home">

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();
  const handleNavigate = () => {
    navigation.navigate("Register");
  };
  return (
    <HomeView>
      <HomeContainer>
        <PerfilTitle>Home</PerfilTitle>
        <PerfiList>
          <PerfilCard />
        </PerfiList>
        <HomeButton onPress={handleNavigate}>
          <Text>Novo perfil</Text>
        </HomeButton>
      </HomeContainer>
    </HomeView>
  );
}
