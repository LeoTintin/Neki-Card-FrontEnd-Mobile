import styled from "styled-components/native";

export const LoginContainer = styled.View`
  height: 100%;
  background-color: #ece8cb;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
  color: #ea8720;
  font-weight: bold;
`;

export const StyledTextInput = styled.TextInput<{ hasError?: boolean }>`
  width: 80%;
  border-bottom-width: 1px;
  border-bottom-color: ${({ hasError }) => (hasError ? 'red' : '#ea8720')};
  color: #ea8720;
  padding: 10px;
  margin-bottom: 15px;
`;

export const ErrorMessage = styled.Text`
  color: red; 
  margin-bottom: 15px; 
`;

export const StyledButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #ea8720;
  padding: 20px 60px;
  border-radius: 6px;
`;
