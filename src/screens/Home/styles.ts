import styled from "styled-components/native";

export const HomeView = styled.ScrollView`
  height: 100%;
  background-color: #deddc2;
`;

export const HomeContainer = styled.View`
  align-items: center;
  justify-content: center;
`

export const PerfilTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
  color: #ea8720;
  font-weight: bold;
`;

export const PerfiList = styled.View`
  margin-top: 5px;
  justify-content: center;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const HomeButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #ea8720;
  padding: 20px 60px 20px 60px;
  border-radius: 6px;
  margin-bottom: 20px;
`;
