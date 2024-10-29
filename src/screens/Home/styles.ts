import styled from "styled-components/native";

export const LoadingHome = styled.ActivityIndicator`
  height: 100%;
  background-color: #deddc2;
`;

export const HomeView = styled.View`
  height: 100%;
  background-color: #deddc2;
`;

export const HomeContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const PerfilTitle = styled.Text`
  font-size: 24px;
  margin-top: 60px;
  margin-bottom: 20px;
  color: #ea8720;
  font-weight: bold;
  letter-spacing: 1px;
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
  padding: 20px 60px;
  border-radius: 6px;
  margin-bottom: 20px;
  align-items: center;
`;

export const PefilList = styled.FlatList`
  margin-bottom: 60px;
`;
export const HomeButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
