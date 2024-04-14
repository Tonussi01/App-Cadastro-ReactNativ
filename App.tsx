import React from 'react';
import { Routes } from './src/Router';
import { NativeBaseProvider } from "native-base";


export default function App() {
  return (
    <NativeBaseProvider>
      <Routes/>
    </NativeBaseProvider>
  )};



