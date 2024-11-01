import styled from "styled-components/native";

export const PerfilCardContainer = styled.View`
  width: 100%;
  max-width: 300px;
  background-color: #fff;
  border-radius: 6px 36px 36px 36px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid #349c98;
  position: relative;
  box-sizing: border-box;
  margin: 10px 30px 10px 30px;
`;

export const ProfileIdButton = styled.TouchableOpacity`
  background-color: #fff;
  border-width: 1px;
  border-color: #349c98;
  border-radius: 20px;
  margin-right: auto;
  position: absolute;
  top: -10px;
  left: -10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileID = styled.Text`
  color: #349c98;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
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
  background-color: #349c98;
  padding: 4px 8px;
  border-radius: 999px;
  max-width: 100%;
  overflow: hidden;
`;

export const PerfilEmailText = styled.Text`
  color: #fff;
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
  color: #349c98;
`;

export const ButtonsContainer = styled.View`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
export const PerfilCardButton = styled.TouchableOpacity`
  background: transparent;
  border: none;
`;
