import React, { useCallback, useState } from "react";
import {
  HomeView,
  HomeContainer,
  PefilList,
  HomeButtonText,
  LoadingHome,
  SearchInput,
  NotFoundContainer,
  SearchWrapper,
  SearchIcon,
} from "./styles";
import PerfilCard from "../../Components/PerfilCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Router";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import { MagnifyingGlass } from "phosphor-react-native";
import { View } from "react-native";

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
    return <LoadingHome size="large" color="#349c98" />;
  }

  const renderItem = ({ item }) => (
    <PerfilCard perfil={item} refetch={fetchPerfils} />
  );

  if (filteredPerfils.length <= 0) {
    return (
      <NotFoundContainer>
        <Tittle>Perfis</Tittle>
        <SearchWrapper>
          <SearchInput
            placeholder="Pesquisar perfil"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <SearchIcon>
            <MagnifyingGlass size={22} color="#9d9c9a" />
          </SearchIcon>
        </SearchWrapper>
        <Tittle>Nenhum perfil encontrado</Tittle>
      </NotFoundContainer>
    );
  }

  return (
    <HomeView>
      <HomeContainer>
        <Tittle>Perfis</Tittle>
        <SearchWrapper>
          <SearchInput
            placeholder="Pesquisar perfil"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <SearchIcon>
            <MagnifyingGlass size={22} color="#9d9c9a" />
          </SearchIcon>
        </SearchWrapper>
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
