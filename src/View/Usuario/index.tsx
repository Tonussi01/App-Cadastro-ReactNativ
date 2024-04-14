import React, {  useEffect, useState } from 'react';
import { Center, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonUsuario} from '../../Components/Button/ButtonUsuario';
import { Input } from '../../Components/Input/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast  from "react-native-tiny-toast";
import uuid from 'react-native-uuid';
import DadosUsuarioModel from '../../Model/DadosUsuarioModel';
import { RootTabParamList } from '../../Router';
import { ExcluirItemDialog} from '../..//Components/Dialog'
import { HStack, Modal } from 'native-base';
import { Text,TouchableOpacity, ActivityIndicator} from 'react-native';
import { DadosUsuarioController } from '../../Controller/DadosUsuarioController';
import { Body, Header,Title } from './styles';
import { AntDesign  } from '@expo/vector-icons';


type FormDataProps = DadosUsuarioModel;

const schemaRegister = yup.object({
  nome: yup.string().required("Nome é obrigatório").min(3, "informe pelo menos 3 digitos"),
  sobrenome: yup.string().required("Nome é obrigatório").min(3, "informe pelo menos 3 digitos"),
  email: yup.string().required("Email é obrigatório").min(6, "informe pelo menos 6 digitos").email("E-mail informado não é valido"),
  idade: yup.string(),
  cep: yup.string().required("cep é obrigatório").min(7, "informe os 8 digitos do cep"),  
  logradouro: yup.string(),
  bairro: yup.string(),
  cidade: yup.string(),
  uf: yup.string(),
})


type UsuarioRouteProp = BottomTabScreenProps<RootTabParamList, 'Usuario'>;

export const Usuario = ({ route, navigation }: UsuarioRouteProp) => {

const {control, handleSubmit,reset, setValue, formState: {errors}}  = useForm<FormDataProps>({
  resolver: yupResolver(schemaRegister) as any
});
  const [loading, setLoading] = useState <boolean>(true); 
  const isEditing = !!route?.params?.id;
  const [cep, setCep] = useState<string>("");
  const [seacherID, setSeacherID] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); 
 
  useEffect(() => {
    if (isEditing) {
      handlerSearcher(route.params.id);
      setSeacherID(true);
    } else {
      setSeacherID(false);
      reset();
      setLoading(false);
    }

    return () => setLoading(true);
  }, [route, isEditing]);

  async function handlerRegister(data: FormDataProps) {
    data.id = uuid.v4().toString();
    try {
      const responseData = await AsyncStorage.getItem('@hookForm:cadastro');
      const dbData = responseData ? JSON.parse(responseData!) : [];
      const previewData = [...dbData, data];
          
      
      await AsyncStorage.setItem(
        '@hookForm:cadastro',
        JSON.stringify(previewData)
      );

      Toast.showSuccess('Cadastro efetuado com sucesso!');
      
      reset();
      handleList();

    } catch (e) {
      console.log(e);
    }
  }

  async function handlerSearcher(id: string) {
    try {
      setLoading(true);
      const responseData = await AsyncStorage.getItem('@hookForm:cadastro');

      const dbData: FormDataProps[] = responseData
        ? JSON.parse(responseData)
        : [];

      const itemEncontrado = dbData?.find((item) => item.id === id);

      if (itemEncontrado){
        Object.keys(itemEncontrado).forEach((key) =>
          setValue(
            key as keyof FormDataProps,
            itemEncontrado?.[key as keyof FormDataProps] as string
          )
        );
        setSeacherID(true);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  const handlerSearcherCep= async () => {
    try{        
      setLoading(true);
      await DadosUsuarioController.fecthCep(cep);      
      const newCeps = [...DadosUsuarioController.getCeps()];     
      if (newCeps.length > 0) {
        const { logradouro, bairro, cidade, uf } = newCeps[0];        
        setValue('logradouro', logradouro);
        setValue('bairro', bairro);
        setValue('cidade', cidade);
        setValue('uf', uf);
    }      
    }catch(error){
        console.error("Error fetching data: ",error)
    }finally{
        setLoading(false);
    }
  }; 
  
  async function handlerAlterRegister(data: FormDataProps) {
    try {
      setLoading(true);
      const responseData = await AsyncStorage.getItem('@hookForm:cadastro');
      const dbData: FormDataProps[] = responseData
        ? JSON.parse(responseData)
        : [];

      const indexToRemove = dbData.findIndex(item => item.id === data.id);

      if (indexToRemove !== -1) {
          dbData.splice(indexToRemove, 1);
          const previewData = [...dbData, data];
          await AsyncStorage.setItem(
            '@hookForm:cadastro',
            JSON.stringify(previewData)
          );

          Toast.showSuccess('Registro alterado com sucesso!');          
          reset();
          handleList();
      } else {
          Toast.show('Registro não localizado!');
      }

    } catch (e) {
      console.log(e);
    }
  }

  async function handleDelete(data:FormDataProps) {
    try {
      setLoading(true);
      const responseData = await AsyncStorage.getItem('@hookForm:cadastro');

      const dbData: FormDataProps[] = responseData
        ? JSON.parse(responseData)
        : [];

      
      const indexToRemove = dbData.findIndex(item => item.id === data.id);

     
      if (indexToRemove !== -1) {
          
          dbData.splice(indexToRemove, 1);
          await AsyncStorage.setItem(
            '@hookForm:cadastro',
            JSON.stringify(dbData)
          );
      setShowDeleteDialog(false)
      setSeacherID(false);      
      handleList();      
      Toast.showSuccess('Registro excluído com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao excluir o registro:', error);
      Toast.show('Ocorreu um erro ao excluir o registro');
    }
  }

  function handleList() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    if (route?.params?.id) handlerSearcher(route?.params?.id);
    else {
      reset();
      setLoading(false);
    }

    return () => setLoading(true);
  }, [route]);

  if (loading) return <ActivityIndicator size='large' color='#0000ff' />;


  return (
    <KeyboardAwareScrollView> 
      <VStack bgColor="gray.300" flex={1} px={5} pb={100}>
        <Header>
          <Title>Cadastro de Competidores</Title>
        </Header>
        <Text></Text>
        <Body>
          <Controller
            control={control}
            name='nome'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
            <Input
              placeholder='Nome'
              onChangeText={onChange}
              errorMessage={errors.nome?.message}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name='sobrenome'
          defaultValue=''
          render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Sobrenome'
            onChangeText={onChange}
            errorMessage={errors.sobrenome?.message}
            value={value}
          />
        )}
        /> 

        <Controller
          control={control}
          name='idade'
          defaultValue=''
          render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Idade'
            onChangeText={onChange}
            errorMessage={errors.idade?.message}
            value={value}
          />
        )}
        /> 

        <Controller
          control={control}
          name='email'
          defaultValue=''
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='E-mail'
              onChangeText={onChange}
              errorMessage={errors.email?.message}
              value={value}
            />
          )}
        /> 

        <Controller
          control={control}
          name='cep'
          defaultValue=''
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder='Cep'
              value={value} 
              onChangeText={(newCep) => {
              onChange(newCep);                    
              setCep(newCep);
            }}
            />   
          )}              
        /> 
        <Center>
          <TouchableOpacity onPress={handlerSearcherCep} >
            <AntDesign name="search1" size={24}  color="black" />          
          </TouchableOpacity>
        </Center>
        <Text></Text>
          
         
        <Controller
          control={control}
          name='logradouro'
          defaultValue=''
          render={({ field: { onChange, value } }) => (
          <Input
              placeholder='Logradouro'
              onChangeText={onChange}
              errorMessage={errors.logradouro?.message}
              value={value}                  
          /> )}
        /> 

        <Controller
          control={control}
          name='bairro'
          defaultValue=''
          render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Bairro'
            onChangeText={onChange}
            errorMessage={errors.bairro?.message}
            value={value} />)}
        /> 

        <Controller
          control={control}
          name='cidade'
          defaultValue=''
          render={({ field: { onChange, value } }) => (
          <Input
            placeholder='Cidade'
            onChangeText={onChange}
            errorMessage={errors.cidade?.message}
            value={value}/> )}
        /> 

        <Controller
          control={control}
          name='uf'
          defaultValue=''
          render={({ field: { onChange, value } }) => (
          <Input
            placeholder='UF'
            onChangeText={onChange}
            errorMessage={errors.uf?.message}
            value={value}/>)}
        />           
           
        {seacherID ? (
          <VStack>
          <HStack>
            <ButtonUsuario rounded="md" shadow={3} title='Alterar' color='#F48B20' onPress={handleSubmit(handlerAlterRegister)} />
          </HStack>
          <HStack paddingTop={5}>
            <ButtonUsuario rounded="md" shadow={3} title='Excluir' color='#CC0707' onPress={() => setShowDeleteDialog(true)} />
          </HStack>
          </VStack>
        ) : (
          <ButtonUsuario title='Cadastrar' color='green.700' onPress={handleSubmit(handlerRegister)} />
        )}
        
        {}
        <Modal isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
          <ExcluirItemDialog
            isVisible={showDeleteDialog}
            onCancel={() => setShowDeleteDialog(false)}
            onConfirm={handleSubmit(handleDelete)}
          />
        </Modal>
     </Body>    
    </VStack>
  </KeyboardAwareScrollView> 
 );
};