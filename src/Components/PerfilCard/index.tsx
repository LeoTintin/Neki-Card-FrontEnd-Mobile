import React, { useState } from "react";
import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import {
  PerfilCardContainer,
  PerfilEmail,
  PerfilEmailText,
  ProfileImage,
  PerfilName,
  PerfilSocialName,
  DataNascimento,
  TelephoneNumber,
  RedeSocial,
  ButtonsContainer,
  PerfilCardButton,
} from "./styles";
import { NotePencil, PencilLine, Trash } from "phosphor-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../service/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Router";
import { useNavigation } from "@react-navigation/native";

type PerfilNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function PerfilCard({ perfil }) {
  const navigation = useNavigation<PerfilNavigationProp>();
  const [isPressed, setIsPressed] = useState(false);
  const formatDate = (dateString) => {
    if (!dateString) return "Data não informada";
    const [datePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("ID do perfil não encontrado.");
      return;
    }

    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja deletar este perfil?",
      [
        {
          text: "Cancelar",
          onPress: () => alert("A operação de exclusão foi cancelada."),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              if (!token) {
                alert("Token não encontrado. Faça login novamente.");
                return;
              }

              await api.delete(`/perfil/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              alert("Perfil excluído com sucesso!");
            } catch (error) {
              console.error("Erro ao deletar perfil!", error);
              alert("Erro ao deletar perfil!");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <PerfilCardContainer>
      <TouchableOpacity
        onPress={() => navigation.navigate("Specific", { perfilId: perfil.id })} //
      >
        <ProfileImage
          source={{ uri: `http://10.0.2.2:8080/imagens/${perfil.foto}` }}
        />
      </TouchableOpacity>
      <PerfilEmail>
        <PerfilEmailText>{perfil.email}</PerfilEmailText>
      </PerfilEmail>
      <PerfilName>{perfil.nome}</PerfilName>
      <PerfilSocialName>
        {perfil.nomeSocial || "Nome social não informado"}
      </PerfilSocialName>
      <DataNascimento>
        {perfil.dataNascimento
          ? formatDate(perfil.dataNascimento)
          : "Data de nascimento não informada"}
      </DataNascimento>
      <TelephoneNumber>
        {perfil.telefone || "Telefone não informado"}
      </TelephoneNumber>
      <RedeSocial>
        {perfil.redeSocial || "Rede social não informada"}
      </RedeSocial>
      <ButtonsContainer>
        <PerfilCardButton
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={() => navigation.navigate("Update", { perfilId: perfil.id })}
        >
          <NotePencil size={26} color="#ea8720" />
        </PerfilCardButton>
        <PerfilCardButton
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={() => handleDelete(perfil.id)}
        >
          <Trash size={26} color="#ea8720" />
        </PerfilCardButton>
      </ButtonsContainer>
    </PerfilCardContainer>
  );
}
