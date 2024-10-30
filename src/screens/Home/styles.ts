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

export const SearchInput = styled.TextInput`
  width: 60%;
  border-bottom-width: 1px;
  border-bottom-color: #ea8720;
  color: #403937;
  font-weight: 700;
  padding: 10px;
  margin-bottom: 15px;
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

export const PefilList = styled.FlatList`
  margin-bottom: 60px;
`;

export const HomeButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
