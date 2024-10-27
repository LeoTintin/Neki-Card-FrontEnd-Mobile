import React from "react";
import { View, Text, Image } from "react-native";
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
} from "./styles";

export default function PerfilCard() {
  return (
    <PerfilCardContainer>
      <ProfileImage source={require("../../assets/images/img_profile.png")} />
      <PerfilEmail>
        <PerfilEmailText>Email</PerfilEmailText>
      </PerfilEmail>
      <PerfilName>Leonardo Guerati Cunha</PerfilName>
      <PerfilSocialName>Leo</PerfilSocialName>
      <DataNascimento>13/03/2004</DataNascimento>
      <TelephoneNumber>(21)993197817</TelephoneNumber>
      <RedeSocial>Facebook</RedeSocial>
    </PerfilCardContainer>
  );
}
