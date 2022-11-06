import { Center, Text, Icon } from "native-base";
import React from "react";
import Logo from '../../assets/logo.svg'
import { Button } from "../../components/Button/Button";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAuth } from "../../hooks/useAuth";



export default function SignIn(){

    const {signIn, user} = useAuth();

    console.log('dados do user', user)

    return(
        <Center flex={1} bgColor="gray.900" p={7}>
            <Logo width={212} height={40}/>
            <Button tittle="ENTRAR COM O GOOGLE" leftIcon={<Icon as={AntDesign} name="google" color="white" size="md"/>} type="SECONDARY"  mt={12} onPress={signIn}/>
            <Text color="white" fontFamily="heading" textAlign="center" mt={4}>Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.</Text>
        </Center>
    )
}