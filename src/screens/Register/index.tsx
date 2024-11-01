import { Platform } from "react-native";

import {
  StyledTextInput,
  ErrorMessage,
  DateInput,
  StyledTextButton,
  RegisterContainer,
  RegisterHeader,
  GoBackButton,
  ImgPresable,
  ImgContainer,
  ImageView,
  StyledImageInput,
} from "./styles";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Router";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerResult } from "expo-image-picker";
import { api } from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowLeft, Camera } from "phosphor-react-native";
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";

type FormDataProps = {
  nome: string;
  email: string;
  dataNascimento: string;
  foto: string;
  nomeSocial: string;
  telefone: string;
  redeSocial: string;
};

const RegisterFormSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
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

  dataNascimento: yup.string().required("Data de nascimento é obrigatória"),

  nomeSocial: yup.string().optional(),
  telefone: yup.string().optional(),
  redeSocial: yup.string().optional(),
});

type RegisterNavigation = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;

export default function Register() {
  const navigation = useNavigation<RegisterNavigation>();

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const [isFocusedNome, setIsFocusedNome] = useState(false);
  const [isFocusedNomeSocial, setIsFocusedNomeSocial] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedTelefone, setIsFocusedTelefone] = useState(false);
  const [isFocusedRedeSocial, setIsFocusedRedeSocial] = useState(false);

  const nomeRef = useRef<any>(null);
  const nomeSocialRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const telefoneRef = useRef<any>(null);
  const redeSocialRef = useRef<any>(null);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("É necessário conceder permissão para acessar a galeria!");
      return;
    }

    const result: ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      const selectedFileUri = result.assets[0]?.uri;

      if (selectedFileUri) {
        setSelectedFile(selectedFileUri);
        setValue("foto", selectedFileUri);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: "Seleção de imagem cancelada",
          visibilityTime: 1700,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: "Seleção de imagem cancelada",
        visibilityTime: 1700,
      });
    }
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
      }

      const adjustedDate = new Date(currentDate);
      adjustedDate.setUTCHours(0, 0, 0, 0);
      const formattedDate = adjustedDate.toISOString().split("T")[0];
      setValue("dataNascimento", formattedDate);
    } else {
      toggleDatePicker();
    }
  };

  const criarPerfil = async (data: FormDataProps) => {
    try {
      const formData = new FormData();
      formData.append("nome", data.nome);
      formData.append("email", data.email);
      formData.append("nomeSocial", data.nomeSocial || "");
      formData.append("dataNascimento", data.dataNascimento);
      formData.append("telefone", data.telefone || "");
      formData.append("redeSocial", data.redeSocial || "");

      if (selectedFile) {
        const uriParts = selectedFile.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("foto", {
          uri: selectedFile,
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      if (!selectedFile) {
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: "Selecione uma imagem",
        });
        return;
      }

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        alert("Token não encontrado. Faça login novamente.");
        return;
      }

      const response = await api.post("/perfil", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Perfil criado com sucesso!",
        visibilityTime: 1700,
      });
      navigation.navigate("Home");
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 409) {
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: "Este e-mail já está em uso!",
          visibilityTime: 1700,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: "Erro ao criar perfil!",
          visibilityTime: 1700,
        });
      }
    }
  };

  return (
    <RegisterContainer>
      <RegisterHeader>
        <Tittle>Novo Perfil</Tittle>
        <GoBackButton onPress={() => navigation.navigate("Home")}>
          <ArrowLeft size={26} color="#349c98" />
        </GoBackButton>
      </RegisterHeader>

      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <>
            <StyledTextInput
              ref={nomeRef}
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              isFocused={isFocusedNome}
              onFocus={() => setIsFocusedNome(true)}
              onBlur={() => setIsFocusedNome(false)}
              hasError={!!errors.nome}
              placeholderTextColor={"#349c98"}
              returnKeyType="next"
              onSubmitEditing={() => nomeSocialRef.current.focus()}
            />
            {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
          </>
        )}
      />

      <Controller
        control={control}
        name="nomeSocial"
        render={({ field: { onChange, value } }) => (
          <StyledTextInput
            ref={nomeSocialRef}
            placeholder="Nome Social"
            onChangeText={onChange}
            value={value}
            isFocused={isFocusedNomeSocial}
            onFocus={() => setIsFocusedNomeSocial(true)}
            onBlur={() => setIsFocusedNomeSocial(false)}
            placeholderTextColor={"#349c98"}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <StyledTextInput
              ref={emailRef}
              placeholder="E-mail"
              onChangeText={onChange}
              value={value}
              isFocused={isFocusedEmail}
              onFocus={() => setIsFocusedEmail(true)}
              onBlur={() => setIsFocusedEmail(false)}
              hasError={!!errors.email}
              placeholderTextColor={"#349c98"}
              returnKeyType="next"
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
          render={({ field: { value } }) => (
            <>
              <StyledTextInput
                placeholder="Data de nascimento:  DD/MM/YYYY"
                value={value}
                hasError={!!errors.dataNascimento}
                placeholderTextColor={"#349c98"}
                returnKeyType="next"
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

      <Controller
        control={control}
        name="telefone"
        render={({ field: { onChange, value } }) => (
          <StyledTextInput
            ref={telefoneRef}
            placeholder="Numero de telefone"
            onChangeText={onChange}
            value={value}
            isFocused={isFocusedTelefone}
            onFocus={() => setIsFocusedTelefone(true)}
            onBlur={() => setIsFocusedTelefone(false)}
            placeholderTextColor={"#349c98"}
            returnKeyType="next"
            onSubmitEditing={() => redeSocialRef.current.focus()}
          />
        )}
      />
      <Controller
        control={control}
        name="redeSocial"
        render={({ field: { onChange, value } }) => (
          <StyledTextInput
            ref={redeSocialRef}
            placeholder="Rede Social"
            onChangeText={onChange}
            value={value}
            isFocused={isFocusedRedeSocial}
            onFocus={() => setIsFocusedRedeSocial(true)}
            onBlur={() => setIsFocusedRedeSocial(false)}
            placeholderTextColor={"#349c98"}
          />
        )}
      />

      <ImgPresable onPress={handleImagePicker}>
        <StyledImageInput editable={false} />

        {selectedFile ? (
          <ImgContainer>
            <ImageView source={{ uri: selectedFile }} />
          </ImgContainer>
        ) : (
          <Camera size={32} color="#349c98" />
        )}
      </ImgPresable>
      <Button onPress={handleSubmit(criarPerfil)}>
        <StyledTextButton>Criar novo perfil</StyledTextButton>
      </Button>
    </RegisterContainer>
  );
}
