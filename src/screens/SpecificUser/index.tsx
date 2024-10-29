import { Text } from "react-native";
import {
  GoBackButton,
  SpecificPerfilCardContainer,
  SpecificPerfilHeader,
  Title,
} from "./styles";
import { ArrowLeft } from "phosphor-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../service/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Router";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PerfilCard from "../../Components/PerfilCard";

type PerfilNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function SpecificUser() {
  const navigation = useNavigation<PerfilNavigationProp>();
  const route = useRoute();
  const { perfilId } = route.params;
  const [specificPerfil, setSpecificPerfil] = useState(null);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  useEffect(() => {
    async function fetchPerfil() {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          alert("Token não encontrado. Faça login novamente.");
          return;
        }
        const response = await api.get(`/perfil/${perfilId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSpecificPerfil(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil!", error);
      }
    }
    fetchPerfil();
  }, [perfilId]);
  if (!specificPerfil) {
    return <Text>Carregando...</Text>;
  }

  return (
    <SpecificPerfilCardContainer>
      <SpecificPerfilHeader>
        <Title>
          Perfil: {"\n"}
          {specificPerfil.nome}{" "}
        </Title>
        <GoBackButton onPress={() => navigation.navigate("Home")}>
          <ArrowLeft size={26} color="#ea8720" />
        </GoBackButton>
      </SpecificPerfilHeader>
      <PerfilCard perfil={specificPerfil} />
    </SpecificPerfilCardContainer>
  );
}
