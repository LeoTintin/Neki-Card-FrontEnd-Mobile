import styled from "styled-components/native";

export const LoginContainer = styled.View`
  height: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const InputWrapper = styled.View<{ isFocused?: boolean }>`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ isFocused }) =>
    isFocused ? "#349c98" : "#9d9c9a"};
  margin-bottom: 10px;
`;

export const InputIcon = styled.TouchableOpacity`
  margin-top: 25px;
  margin-right: 10px;
`;

export const StyledTextInput = styled.TextInput`
  width: 70%;
  color: #349c98;
  padding: 5px;
  margin-top: 20px;
`;

export const ErrorMessage = styled.Text`
  color: red;
  margin-bottom: 15px;
`;

export const StyledButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #349c98;
  padding: 20px 60px;
  border-radius: 6px;
`;

export const StyledTextButton = styled.Text`
  color: #fff;
  font-weight: bold;
`;
