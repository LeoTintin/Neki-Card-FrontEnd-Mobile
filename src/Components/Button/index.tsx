import { ComponentButton } from "./styles";

export default function Button({ children, onPress }) {
  return <ComponentButton onPress={onPress}>{children}</ComponentButton>;
}
