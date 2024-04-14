import React from 'react';
import {NavigationContainer,DefaultTheme} from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../View/Home';
import { Usuario } from '../View/Usuario' ;

export type RootTabParamList ={
    Home:undefined;
    Usuario: {id:string};
}

const Tab = createBottomTabNavigator<RootTabParamList>()

const Mytheme = {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        primary: 'blue',
        background: 'white',
    }
}

export const Routes = () => {
  return (
        <NavigationContainer theme={Mytheme}>
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                 options={{
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name='home' color={color} size={26} />
                    ),
                title: 'Home',headerTitleAlign: 'center',
            }}
            />


            <Tab.Screen
                listeners={({ navigation }) => ({
                    focus: () => {
                    navigation.setParams({ id: undefined });
                    },
                })}
                name='Usuario' 
                component={Usuario}
                options={{
                    tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                        name='account-multiple-plus'
                        color={color}
                        size={26}
                    />
                    ), title:'Área do Cliente',headerTitleAlign: 'center',
                }}
                />


        </Tab.Navigator>


    </NavigationContainer>
    
  );
}