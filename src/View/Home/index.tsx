import React,{ useCallback, useState } from 'react';
import { Container, Header} from "./styles";
import { Input } from "../../Components/InputPesq/InputPesq";
import BannerImg from "../../../assets/BannerHome.png";
import { Card, CardProps } from '../../Components/Card';
import { View,  FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from './styles';


type Props = {
  navigation: any;
};  

export const Home = ({navigation}:Props) =>{
  
  const [data, setData] = useState<CardProps[]>([]);

function handleEdit(id:any) {
  navigation.navigate('Usuario', {id:id});
}

useFocusEffect (useCallback(() => {
  handleFectchData(); 
},[]))

async function handleFectchData () {
  try {
    const jsonValue = await AsyncStorage.getItem('@hookForm:cadastro');
    const data = jsonValue ? JSON.parse(jsonValue) : [];
    const reversedData = data.reverse();
    setData(reversedData);
    setData(data);   
    console.log(data); 
    return jsonValue 
  } catch (e) {
  }
  
};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Header source={BannerImg}>
        <Input placeholder="Pesquisar..."/>
      </Header>
        <Container>
         
        <FlatList 
        data={data}
        keyExtractor={item =>item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) =>
          <Card
            data={item}
            onPress={() =>handleEdit(item.id)}
          />
        }
      />
        </Container>
      
     </View>
  );
}