import { Platform } from "react-native";
import {
  StyledButton,
  StyledTextInput,
  Title,
  ErrorMessage,
  DateInput,
  UpdateContainer,
  UpdateHeader,
  GoBackButton,
  StyledTextButton,
  ImgPresable,
  StyledImageInput,
  ImgContainer,
  ImageView,
} from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/Router";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerResult } from "expo-image-picker";
import { api } from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowLeft, Camera } from "phosphor-react-native";
import Button from "../../Components/Button";
import Tittle from "../../Components/Tittle";
import Toast from "react-native-toast-message";

type FormDataProps = {
  nome: string;
  email: string;
  dataNascimento: string;
  foto: string;
  nomeSocial: string;
  telefone: string;
  redeSocial: string;
};

const UpdateFormSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Formato inválido").required("Email é obrigatório"),
  dataNascimento: yup.string().required("Insira uma data de nascimento"),

  nomeSocial: yup.string().optional(),
  telefone: yup.string().optional(),
  redeSocial: yup.string().optional(),
});

type UpdateNavigation = NativeStackNavigationProp<RootStackParamList, "Update">;

export default function UpdatePerfil() {
  const navigation = useNavigation<UpdateNavigation>();
  const route = useRoute();
  const { perfilId } = route.params;

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(UpdateFormSchema),
  });

  const loadProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        alert("Token não encontrado.Faça login novamente");
        return;
      }
      const response = await api.get(`/perfil/${perfilId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setValue("nome", data.nome);
      setValue("email", data.email);
      setValue("nomeSocial", data.nomeSocial);
      setValue("dataNascimento", data.dataNascimento);
      setValue("telefone", data.telefone);
      setValue("redeSocial", data.redeSocial);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: "Erro ao carregar perfil!",
        visibilityTime: 1700,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
    }, [])
  );

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
        console.log("Imagem selecionada:", selectedFileUri);
        setSelectedFile(selectedFileUri);
        setValue("foto", selectedFileUri);
      } else {
        console.log("A URI da imagem não foi encontrada.");
      }
    } else {
      console.log("Seleção de imagem cancelada.");
    }
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
      }

      const formattedDate = currentDate.toISOString().split("T")[0];
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

      const token = await AsyncStorage.getItem("token");
      console.log("Token recuperado:", token);

      if (!token) {
        alert("Token não encontrado. Faça login novamente.");
        return;
      }

      const response = await api.put(`/perfil/${perfilId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Perfil atualizado com sucesso!",
        visibilityTime: 1700,
      });
      navigation.navigate("Home", { updated: true });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro!",
        text2: "Erro ao atualizar perfil!",
        visibilityTime: 1700,
      });
    }
  };

  return (
    <UpdateContainer>
      <UpdateHeader>
        <Tittle>Perfil</Tittle>
        <GoBackButton onPress={() => navigation.navigate("Home")}>
          <ArrowLeft size={26} color="#ea8720" />
        </GoBackButton>
      </UpdateHeader>

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
        name="nomeSocial"
        render={({ field: { onChange, value } }) => (
          <StyledTextInput
            placeholder="Nome Social"
            onChangeText={onChange}
            value={value}
          />
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
            placeholder="Numero de telefone"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name="redeSocial"
        render={({ field: { onChange, value } }) => (
          <StyledTextInput
            placeholder="Rede Social"
            onChangeText={onChange}
            value={value}
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
          <Camera size={32} color="#ea8720" />
        )}
      </ImgPresable>

      <Button onPress={handleSubmit(criarPerfil)}>
        <StyledTextButton>Atualizar perfil</StyledTextButton>
      </Button>
    </UpdateContainer>
  );
}
