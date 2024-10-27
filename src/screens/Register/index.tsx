import { Text, Pressable, Platform, TextInput } from "react-native";
import {
  RedgisterContainer,
  StyledButton,
  StyledTextInput,
  Title,
  ErrorMessage,
  DateInput,
} from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Router";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

type FormDataProps = {
  nome: string;
  email: string;
  dataNascimento: string;
};

const RegisterFormSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Formato inválido").required("Email é obrigatório"),
  dataNascimento: yup.string().required("Insira uma data de nascimento"),
});

type RegisterNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

export default function Register() {
  const navigation = useNavigation<RegisterNavigation>();
  const handleCreate = (data: FormDataProps) => {
    navigation.navigate("Home");
  };

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(RegisterFormSchema),
  });

  return (
    <RedgisterContainer>
      <Title>Registrar</Title>

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

      <StyledTextInput placeholder="Nome Social" />

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

      <DateInput onPress={toggleDatePicker}>
        <Controller
          control={control}
          name="dataNascimento"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Data de nascimento:  DD/MM/YYYY"
                onChangeText={onChange}
                value={dateOfBirth}
                hasError={!!errors.dataNascimento}
                editable={false}
              />
              {errors.dataNascimento && (
                <ErrorMessage>{errors.dataNascimento.message}</ErrorMessage>
              )}
            </>
          )}
        />
      </DateInput>

      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChangeDate}
        />
      )}

      <StyledTextInput placeholder="Numero de telefone" />
      <StyledTextInput placeholder="Rede social" />
      <StyledButton onPress={handleSubmit(handleCreate)}>
        <Text>Criar novo perfil</Text>
      </StyledButton>
    </RedgisterContainer>
  );
}
