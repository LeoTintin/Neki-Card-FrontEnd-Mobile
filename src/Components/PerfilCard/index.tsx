import React, { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
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
  ProfileID,
  ProfileIdButton,
} from "./styles";
import { NotePencil, Trash } from "phosphor-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../service/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Router";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

type PerfilNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function PerfilCard({ perfil, refetch }) {
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
          onPress: () =>
            Toast.show({
              text1: "Cancelada",
              text2: "Operação de exclusão cancelada",
              visibilityTime: 1700,
            }),
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
              Toast.show({
                type: "success",
                text1: "Sucesso!",
                text2: "Perfil excluido com sucesso!",
                visibilityTime: 1700,
              });
              refetch();
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Erro!",
                text2: "Erro ao deletar perfil!",
                visibilityTime: 1700,
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <PerfilCardContainer>
      <ProfileIdButton
        onPress={() => navigation.navigate("Specific", { perfilId: perfil.id })}
      >
        <ProfileID>{perfil.id} </ProfileID>
      </ProfileIdButton>
      <TouchableOpacity
        onPress={() => navigation.navigate("Specific", { perfilId: perfil.id })}
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
          <NotePencil size={26} color="#349c98" />
        </PerfilCardButton>
        <PerfilCardButton
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={() => handleDelete(perfil.id)}
        >
          <Trash size={26} color="#349c98" />
        </PerfilCardButton>
      </ButtonsContainer>
    </PerfilCardContainer>
  );
}
