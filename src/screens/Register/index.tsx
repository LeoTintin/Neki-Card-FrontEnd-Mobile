import { Button, Text, TextInput, View } from 'react-native'

export default function Register() {
  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Nome"></TextInput>
      <TextInput placeholder="Nome Social"></TextInput>
      <TextInput placeholder="Email"></TextInput>
      <TextInput placeholder="Data de nascimento"></TextInput>
      <TextInput placeholder="Numero de telefone"></TextInput>
      <TextInput placeholder="Rede social"></TextInput>
      <Button title="Entrar"></Button>
    </View>
  );
}