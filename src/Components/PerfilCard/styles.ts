import styled from "styled-components/native";

export const PerfilCardContainer = styled.View`
  width: 100%;
  max-width: 300px;
  background-color: #ece8cb;
  border-radius: 6px 36px 6px 36px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  align-items: center;
  text-align: center;
  border: 1px solid #ea8720;
  box-sizing: border-box;
`;

export const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  margin-top: 20px;
  border-radius: 8px;
`;

export const PerfilEmail = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 12px;
  flex-wrap: wrap;
  background-color: #ea8720;
  padding: 4px 8px;
  border-radius: 999px;
  max-width: 100%;
  overflow: hidden;
`;

export const PerfilEmailText = styled.Text`
  color: #ece8cb;
  font-size: 12px;
  font-weight: 700;
`;

export const PerfilName = styled.Text`
  font-size: 20px;
  font-weight: 700;
  max-width: 100%;
  color: #403937;
`;

export const PerfilSocialName = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
  max-width: 100%;
  color: #403937;
`;

export const DataNascimento = styled.Text`
  font-size: 16px;
  margin: 0;
  margin-bottom: 4px;
  max-width: 100%;
  color: #403937;
`;

export const TelephoneNumber = styled.Text`
  font-size: 16px;
  margin: 0;
  margin-bottom: 8px;
  max-width: 100%;
  color: #403937;
`;

export const RedeSocial = styled.Text`
  font-size: 16px;
  margin: 1px;
  max-width: 100%;
  color: #ea8720;
`;
