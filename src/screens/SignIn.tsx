import { Center, Text } from "native-base";
import { StatusBar } from 'expo-status-bar';

export function SignIn(){
  return(
    <Center flex={1} bgColor="#121214">
        <Text color="white" fontSize={24}>
          Hello world!
        </Text>
        <StatusBar style="auto" />
      </Center>
  )
}