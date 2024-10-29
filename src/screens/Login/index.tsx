import {
  LoginContainer,
  StyledButton,
  StyledTextInput,
  Title,
  ErrorMessage,
  StyledTextButton,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormDataProps = {
  nome: string;
  email: string;
  senha: string;
};

const LoginFormSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Formato inválido").required("Email é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
});

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function Login() {
  const navigation = useNavigation<LoginNavigationProp>();

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
        console.log("Token recebido:", token);
        alert("Usuário logado com sucesso!");

        navigation.navigate("Home");
      } else {
        alert("Token não recebido. Verifique a resposta do servidor.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro de rede:", error.message);
        alert("Erro de rede: " + error.message);
      } else {
        console.error("Erro inesperado:", error);
        alert("Erro inesperado: " + error.message);
      }
    }
  }

  return (
    <LoginContainer>
      <Title>Login</Title>

      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <>
            <StyledTextInput
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              hasError={!!errors.nome}
            />
            {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <StyledTextInput
              placeholder="E-mail"
              onChangeText={onChange}
              value={value}
              hasError={!!errors.email}
            />
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
            <StyledTextInput
              placeholder="Senha"
              onChangeText={onChange}
              value={value}
              secureTextEntry
              hasError={!!errors.senha}
            />
            {errors.senha && (
              <ErrorMessage>{errors.senha.message}</ErrorMessage>
            )}
          </>
        )}
      />

      <StyledButton onPress={handleSubmit(handleLogin)}>
        <StyledTextButton>Entrar</StyledTextButton>
      </StyledButton>
    </LoginContainer>
  );
}
