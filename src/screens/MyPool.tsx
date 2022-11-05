import { useState, useCallback } from 'react';

import { Box, FlatList, Heading, Icon, Text, ScrollView, VStack, Flex, useToast } from "native-base";
import { Header } from "../components/Header";
import { MagnifyingGlass } from 'phosphor-react-native'
import Logo from '../assets/logo.svg';
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { Loading } from "../components/Loading";
import { ButtonIcon } from "../components/ButtonIcon";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from '../services/api';
import { PoolCard, PoolPros } from '../components/PoolCard';

interface PoolsProps {
  pools: PoolPros[];
}

interface PoolsPropsState {
  data: PoolPros[];
}
export function Pools(props){
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState([] as PoolPros[])
  const navigation = useNavigation();
  const toast = useToast();

  useFocusEffect(useCallback(() => {
   try{
    async function getPools() {
      const { data } = await api.get<PoolsProps>('/pools');

      console.log(data.pools)
      setPools(data.pools)
    }
    getPools();
   } catch (err) {
    console.log(err);

    toast.show({
      title: "Não foi possível carregar os bolões",
      placement: 'top',
      bgColor: 'red.500'
    })
   } finally {
    setIsLoading(false)
   }

    
  }, [props]))


  return(
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={6} mx={5} alignItems="center"  pb={4} mb={4} borderBottomWidth={1} borderColor="gray.600">
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={MagnifyingGlass} color="black"/>}
          onPress={() => navigation.navigate('find')}
        >
          
        </Button>
        
       
      </VStack>
        
         {
            isLoading ?  <Flex justifyContent="center"  alignItems="center"borderWidth="1" borderColor="red">
            <Loading />
           </Flex>  : <FlatList 
          data={pools}
          keyExtractor={item => item.id}
          renderItem={( { item} ) => <PoolCard data={item} />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{pb: 20}}

          ListEmptyComponent={( ) => <EmptyPoolList />}
        />
         }
        
          
        
    </VStack>
  )
}