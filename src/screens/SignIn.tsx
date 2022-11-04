import { Center, Icon, Text } from "native-base";
import { Button } from '../components/Button'
import { StatusBar } from 'expo-status-bar';
import Logo from '../assets/logo.svg';
import { Fontisto } from '@expo/vector-icons'; 

import { THEME } from '../styles/theme';

import { GoogleLogo } from "phosphor-react-native";
import { useAuth } from "../hooks/useAuth";

export function SignIn(){
  const {signIn, user } = useAuth()
  return(
    <Center flex={1} bgColor="#121214" padding={22}>
        <Logo width={212} height={40}/>
        
        <Button 
          title="ENTRAR COM GOOGLE"
          leftIcon={<Icon as={Fontisto} name="google" fontWeight="bold" size='md' color="white" />}
          type="SECONDARY"
          mt={12}
          onPress={signIn}
        />
        <Text color={THEME.colors.white} fontSize={14} textAlign="center" mt={4}>
          Não utilizamos nenhuma informação além do seu e-mail para criação de sua conta.
        </Text>
        <StatusBar style="auto" />
      </Center>
  )
}