import React, { useState, useRef } from "react";

import {
  LoginContainer,
  StyledTextInput,
  ErrorMessage,
  StyledTextButton,
  InputIcon,
  InputWrapper,
} from "./styles";

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import Toast from "react-native-toast-message";
import axios from "axios";
import { EnvelopeSimple, Eye, EyeClosed } from "phosphor-react-native";

type FormDataProps = {
  nome: string;
  email: string;
  senha: string;
};

const LoginFormSchema = yup.object().shape({

  email: yup
    .string()
    .email("Formato inválido")
    .required("Email é obrigatório")
    .test(
      "domain-validation",
      "O email deve terminar com @neki-it.com.br ou @neki.com.br",
      (email) => {
        return (
          typeof email === "string" &&
          (email.endsWith("@neki-it.com.br") || email.endsWith("@neki.com.br"))
        );
      }
    ),
  senha: yup.string().required("Senha é obrigatória"),

});

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function Login() {

  const navigation = useNavigation<LoginNavigationProp>();
  const [showPassword, setShowPassword] = useState(false);

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedSenha, setIsFocusedPassword] = useState(false);

  const senhaRef = useRef<any>(null);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(LoginFormSchema),
  });

  async function handleLogin(data: FormDataProps) {

    try {
      const response = await api.post("/auth/login", data);
      const token = response.data.token;

      if (token) {
        await AsyncStorage.setItem("token", token);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Usuario logado com sucesso!",
          visibilityTime: 1700,
        });

        navigation.navigate("Home");
      } else {
        alert("Token não recebido. Verifique a resposta do servidor.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: "Credenciais inválidas!",
          visibilityTime: 1700,
        });
      }
    }
  }

  return (

    <LoginContainer>
      <Tittle>Login</Tittle>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <InputWrapper isFocused={isFocusedEmail}>
              <StyledTextInput
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                hasError={!!errors.email}
                returnKeyType="next"
                onSubmitEditing={() => senhaRef.current.focus()}
              />

              <InputIcon>
                <EnvelopeSimple size={24} color="#9d9c9a" />
              </InputIcon>
            </InputWrapper>
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, value } }) => (
          <>

            <InputWrapper isFocused={isFocusedSenha}>
              <StyledTextInput
                ref={senhaRef}
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(false)}
                secureTextEntry={!showPassword}
                hasError={!!errors.senha}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(handleLogin)}
              />
              
              <InputIcon onPress={toggleShowPassword}>
                {showPassword ? (
                  <EyeClosed size={24} color="#9d9c9a" />
                ) : (
                  <Eye size={24} color="#9d9c9a" />
                )}
              </InputIcon>
            </InputWrapper>
            {errors.senha && (
              <ErrorMessage>{errors.senha.message}</ErrorMessage>
            )}
          </>
        )}
      />

      <Button onPress={handleSubmit(handleLogin)}>
        <StyledTextButton>Entrar</StyledTextButton>
      </Button>
    </LoginContainer>
  );
}
