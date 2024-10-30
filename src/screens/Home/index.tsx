import React, { useCallback, useState } from "react";
import {
  HomeView,
  HomeContainer,
  PefilList,
  HomeButtonText,
  LoadingHome,
  SearchInput,
} from "./styles";
import PerfilCard from "../../Components/PerfilCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Router";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();
  const handleNavigate = () => {
    navigation.navigate("Register");
  };

  const [perfils, setPerfils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPerfils, setFilteredPerfils] = useState([]);

  const fetchPerfils = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado");
        setLoading(false);
        return;
      }

      const response = await api.get("/perfil", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPerfils(response.data);
      setFilteredPerfils(response.data);
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

  useFocusEffect(
    useCallback(() => {
      fetchPerfils();
    }, [])
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = perfils.filter((perfil) =>
      perfil.nome.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPerfils(filtered);
  };

  if (loading) {
    return <LoadingHome size="large" color="#ea8720" />;
  }

  const renderItem = ({ item }) => (
    <PerfilCard perfil={item} refetch={fetchPerfils} />
  );

  return (
    <HomeView>
      <HomeContainer>
        <Tittle>Perfil</Tittle>
        <SearchInput
          placeholder="Pesquisar perfil"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <PefilList
          data={filteredPerfils}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListFooterComponent={
            <Button onPress={handleNavigate}>
              <HomeButtonText>Novo Perfil</HomeButtonText>
            </Button>
          }
        />
      </HomeContainer>
    </HomeView>
  );
}
