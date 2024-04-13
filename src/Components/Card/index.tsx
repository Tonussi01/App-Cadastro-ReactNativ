import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';

export type CardProps = {
  nome: string,
  sobrenome: string,
  email: string,
  idade: string,
  cep:string,  
  logradouro:string,  
  bairro: string,
  cidade:string,
  uf:string,
  id: any,
}
type Props = {
  data: CardProps;
  onPress: () => void;
}
  

export function Card({ data, onPress }: Props) {
  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
        <View>

          <Text style={styles.none}>
            Nome: {data.nome} {data.sobrenome}
          </Text>
          
          <Text style={styles.none}>
            Idade: {data.idade}
          </Text>

          <Text style={styles.email}>
             Email: {data.email}
          </Text>   
          
          <Text style={styles.none}>
            CEP: {data.cep}
          </Text>

          <Text style={styles.none}>
           Logradouro: {data.logradouro}
          </Text>

          <Text style={styles.none}>
           Bairro: {data.bairro}
          </Text>

          <Text style={styles.none}>
            Cidade: {data.cidade}
          </Text>

          <Text style={styles.none}>
            Estado:{data.uf}
          </Text>
                    
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <MaterialIcons
          name="edit"
          size={22}
          color="#888D97"
        />
      </TouchableOpacity>
    </View>
  );
}