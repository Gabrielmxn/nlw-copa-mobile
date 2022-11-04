import { Box, Heading, Icon, Text, VStack } from "native-base";
import { Header } from "../components/Header";
import { MagnifyingGlass } from 'phosphor-react-native'
import Logo from '../assets/logo.svg';
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ButtonIcon } from "../components/ButtonIcon";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function MyPool(){
  return(
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={6} mx={5} alignItems="center"  pb={4} mb={4} borderBottomWidth={1} borderColor="gray.600">
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={MagnifyingGlass} color="black"/>}
        >
          
        </Button>
        
       
      </VStack>
        <Box px={3}>
          <EmptyPoolList 

          />
        </Box>
        
    </VStack>
  )
}