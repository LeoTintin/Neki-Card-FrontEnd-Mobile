import React, { useEffect, useState } from "react";
import {
  HomeButton,
  HomeView,
  HomeContainer,
  PerfilTitle,
  PefilList,
  HomeButtonText,
  LoadingHome,
} from "./styles";
import PerfilCard from "../../Components/PerfilCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Router";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();
  const handleNavigate = () => {
    navigation.navigate("Register");
  };

  const [perfils, setPerfils] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfils = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado");
          setLoading(false);
          return;
        }

        console.log("Token:", token);

        const response = await api.get("/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPerfils(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Erro na resposta da API:", error.response.data);
          console.error("Status:", error.response.status);
        } else {
          console.error("Erro ao buscar perfis:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPerfils();
  }, []);

  if (loading) {
    return <LoadingHome size="large" color="#ea8720" />;
  }
  const renderItem = ({ item }) => <PerfilCard perfil={item} />;

  return (
    <HomeView>
      <HomeContainer>
        <PerfilTitle>Perfils</PerfilTitle>
        <PefilList
          data={perfils}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListFooterComponent={
            <HomeButton onPress={handleNavigate}>
              <HomeButtonText>Novo perfil</HomeButtonText>
            </HomeButton>
          }
        />
      </HomeContainer>
    </HomeView>
  );
}
