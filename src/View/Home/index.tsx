import React,{ useCallback, useState } from 'react';
import {Body, Header,ViewHome,ImgBG} from "./styles";
import {Input } from "../../Components/InputPesq/InputPesq";
import BannerImg from "../../../assets/BannerHome.png";
import {Card, CardProps } from '../../Components/Card';
import {FlatList,TouchableOpacity } from 'react-native';
import {useFocusEffect } from '@react-navigation/native'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles } from './styles';
import {AntDesign  } from '@expo/vector-icons';

type Props = {
  navigation: any;
};  

export const Home = ({navigation}:Props) =>{
  
  
  const [data, setData] = useState<CardProps[]>([]);
  const [filteredData, setFilteredData] = useState<CardProps[]>([]);  
  const [searchQuery, setSearchQuery] = useState('');

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
      setFilteredData(reversedData);  
      return jsonValue 
    } catch (e) {
  }
  
};


function handleSearch() {
  const filteredResults  = data.filter(item => {
      return item.nome.toLowerCase().includes(searchQuery.toLowerCase());
  });

  setFilteredData(filteredResults );
}

  return (
    <ViewHome>
      <Header>
        <ImgBG source={BannerImg}>
          <Input placeholder="Pesquisar por nome..." value={searchQuery} onChangeText={text => setSearchQuery(text)}/>
          <TouchableOpacity  onPress={handleSearch} >
              <AntDesign name="search1" size={24}  color="black"  />          
          </TouchableOpacity>
        </ImgBG>
      </Header>

      <Body>         
        <FlatList 
          data={filteredData}
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
      </Body>      
    </ViewHome>
  );
}