import { Button, Text, TextInput, View } from "react-native";

export default function Login() {
  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Nome"></TextInput>
      <TextInput placeholder="Email"></TextInput>
      <TextInput placeholder="Senha"></TextInput>
      <Button title="Entrar"></Button>
    </View>
  );
}
