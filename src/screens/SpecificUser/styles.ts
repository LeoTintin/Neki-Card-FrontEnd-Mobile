import styled from "styled-components/native";

export const SpecificPerfilCardContainer = styled.View`
  height: 100%;
  background-color: #deddc2;
  align-items: center;
`;

export const SpecificPerfilHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 130px;
  margin-top: 100px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #ea8720;
  font-weight: bold;
  margin-top: 10px;
  letter-spacing: 1px;
`;

export const SpecificName = styled.Text`
  font-size: 24px;
  color: #403937;
  font-weight: bold;
`;

export const GoBackButton = styled.TouchableOpacity`
  background: transparent;
  border: none;
`;
