import styled from "styled-components/native";

export const  Container = styled.TextInput`
width: 50%;
height: 35px;
margin: 60px 0;

background-color: ${({theme}:any) => theme.COLORS.NEUTRO};
color: ${({theme}:any) => theme.COLORS.PRIMARY_800};
`
;