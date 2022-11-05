import { Heading, Text, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import Logo from '../assets/logo.svg';
import { useState } from 'react';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";


export function Find(){
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [codePool, setCodePool] = useState('')
  const toast = useToast();

  async function handleFindPool(){
    
    if (!codePool.trim()){
      return toast.show({
        title: 'Preenche o campo',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    try{
      setIsLoading(true)
      const { data } = await api.post('/pools/join', {
        code: codePool.trim().toUpperCase(),
      })

     navigation.navigate('pools')
     
     return toast.show({
      title: 'Você entrou no bolão!',
      placement: 'top',
      bgColor: 'red.500'
    })

     
    }catch( error){
      console.log(error.response?.data?.message)
      if (error.response?.data?.message === 'Pool not found'){
        return toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      if (error.response?.data?.message === 'You already joined this pool.'){
        return toast.show({
          title: 'Você já está nesse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
      
    } finally{
      setCodePool('');
      setIsLoading(false)
    }
  }
  return(
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton/>

      <VStack mt={8} mx={5} alignItems="center">

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Encontre um bolão através de {'\n'} seu código único
        </Heading>

        <Input
          mb={2} 
          placeholder="Qual o código do bolão?"
          value={codePool}
          onChangeText={setCodePool}
        />
        <Button 
          title="BUSCAR BOLÃO"
          isLoading={isLoading} 
          onPress={handleFindPool}
        />
      </VStack>
      
    </VStack>
  )
}