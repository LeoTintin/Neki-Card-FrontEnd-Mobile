import styled from "styled-components/native";

export const LoadingHome = styled.ActivityIndicator`
  height: 100%;
  background-color: #edf3f2;
`;

export const HomeView = styled.View`
  height: 100%;
  background-color: #edf3f2;
`;

export const HomeContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #edf3f2;
`;

export const NotFoundContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #edf3f2;
  padding-bottom: 117.45%;
`;

export const SearchWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #349c98;
  margin-bottom: 10px;
`;

export const SearchIcon = styled.View`
  margin-right: 10px;
`;

export const SearchInput = styled.TextInput`
  width: 60%;
  color: #403937;
  font-weight: 700;
  padding: 10px;
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
