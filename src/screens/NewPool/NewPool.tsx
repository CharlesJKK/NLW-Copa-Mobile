import React, { useState } from "react"
import { VStack, Heading, Text, useToast } from "native-base"
import { Header } from "../../components/Header/Header"
import Logo from "../../assets/logo.svg"
import { Input } from "../../components/Input/Input"
import { Button } from "../../components/Button/Button"
import { api } from "../../api/api"

export default function NewPool(){

    const toast = useToast();
    const [namePool, setNamePool] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false);

    async function handlePoolCreate(){
        if(!namePool || namePool == ' '){
            return toast.show({
                title: 'Opa, impossível criar um bolão sem nome!',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        try {
            setButtonLoading(true);
            await api.post('/pools', {
                tittle: namePool
            })

            toast.show({
                title: `Bolão ${namePool} criado com sucesso!`,
                placement: 'top',
                bgColor: 'green.500'
            });

            setNamePool('');

        }catch(error){
            console.log(error)

            toast.show({
                title: 'Ops, não foi possível criar o bolão!',
                placement: 'top',
                bgColor: 'red.500'
            })
        }finally{
            setButtonLoading(false);
        }
    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão"/>
            <VStack mt={8} mx={5} alignItems="center">
                <Logo/>
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
                </Heading>
                <Input mb={2} placeholder="Qual o nome do seu bolão?" onChangeText={setNamePool} value={namePool}/>
                <Button tittle="CRIAR MEU BOLÃO" onPress={handlePoolCreate} isLoading={buttonLoading}/>
                <Text color="gray.200" fontSize="sm" px={10} mt={4} textAlign="center">
                    Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>
        </VStack>

    )
}