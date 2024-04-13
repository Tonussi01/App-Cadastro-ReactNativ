import React from 'react';
import { Routes } from './src/Router';
import { NativeBaseProvider } from "native-base";
import {Roboto_400Regular,Roboto_500Medium, Roboto_700Bold, useFonts} from "@expo-google-fonts/roboto" 


export default function App() {
  const [fontLoader] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium, 
    Roboto_700Bold,
  });
  return (
    <NativeBaseProvider>
      <Routes/>
    </NativeBaseProvider>
  )};



