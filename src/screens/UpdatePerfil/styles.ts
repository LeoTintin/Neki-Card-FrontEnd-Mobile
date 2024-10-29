import styled from "styled-components/native";

export const UpdateContainer = styled.View`
  height: 100%;
  background-color: #ece8cb;
  align-items: center;
  justify-content: center;
`;

export const UpdateHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 60px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #ea8720;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const GoBackButton = styled.TouchableOpacity`
  background: transparent;
  border: none;
`;

export const StyledTextInput = styled.TextInput`
  width: 80%;
  border-bottom-width: 1px;
  border-bottom-color: #ea8720;
  color: #ea8720;
  padding: 10px;
  margin-bottom: 15px;
`;

export const DateInput = styled.Pressable`
  width: 100%;
  align-items: center;
`;

export const ErrorMessage = styled.Text`
  color: red;
  margin-bottom: 15px;
`;

export const StyledButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #ea8720;
  padding: 20px 60px 20px 60px;
  border-radius: 6px;
`;

export const StyledTextButton = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const ImgPresable = styled.Pressable`
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  margin-top: 10px;
`;

export const StyledImageInput = styled.TextInput`
  display: none;
`;

export const ImgContainer = styled.View`
  align-items: center;
`;

export const ImageView = styled.Image`
  width: 100px;
  height: 100px;
  margin-top: 10px;
  border-radius: 10px;
  border-width: 1.5px;
  border-color: #ea8720;
`;
