import { Heading, Text, VStack } from "native-base";
import { Header } from "../components/Header";

import Logo from '../assets/logo.svg';
import { useState } from 'react';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";

export function New(){
  const [namePoll, setNamePool] = useState('')

  function handleNamePool(text: string){
    setNamePool(text)
  }
  async function newCreatePool(){
   const { data } = await api.post('pools', {
    title: namePoll
   })

   setNamePool('');
  }
  return(
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          value={namePoll}
          onChangeText={handleNamePool}
        />
        <Button 
          title="CRIAR MEU BALÃO"
          onPress={newCreatePool} 
        />
        <Text textAlign="center" color="gray.200" fontSize="sm" px={10} mt={4}>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.</Text>
      </VStack>
      
    </VStack>
  )
}