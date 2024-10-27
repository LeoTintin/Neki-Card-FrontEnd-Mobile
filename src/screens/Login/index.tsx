import { Text } from "react-native";
import { LoginContainer, StyledButton, StyledTextInput, Title, ErrorMessage } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/Router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

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

  const handleLogin = (data: FormDataProps) => {
    navigation.navigate("Home");
  };

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
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
            {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
          </>
        )}
      />

      <StyledButton onPress={handleSubmit(handleLogin)}>
        <Text>Entrar</Text>
      </StyledButton>
    </LoginContainer>
  );
}