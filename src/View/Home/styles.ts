import styled from "styled-components/native";
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Title = styled.Text`
  color: #fff;
`;

export const Header = styled.ImageBackground`
  width: 100%;
  height:200;
  justify-content: flex-end;
  align-items: center;
`;

export const Content = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`;

export const styles = StyleSheet.create({
list: {
  flex: 1,
  width: '100%',
},
listContent: {
  padding: 24,
  paddingBottom: 150
}
});

