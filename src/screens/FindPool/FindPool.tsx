import React, {useState, useEffect} from 'react';
import { VStack, Heading, useToast} from "native-base";
import { Header } from "../../components/Header/Header";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { api } from '../../api/api';
import { useNavigation } from '@react-navigation/native';

export default function FindPool(){

    const { navigate } = useNavigation();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('');

    async function handleJoingPool(){
        try{
            setIsLoading(true);

            if(!code.trim()){
                toast.show({
                    title: 'Por favor, informe um código.',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }

            await api.post('/pools/join', { code });

            toast.show({
                title: 'Você entrou no bolão com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            })

            navigate('pools');

        } catch(error){
            console.log(error)

            setIsLoading(false);

            if(error.response?.data?.message === 'Pool not found.'){
                toast.show({
                    title: 'Algo deu errado. tente verificar se seu código está correto!',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }else if(error.response?.data?.message === 'You already joined this pool.'){
                toast.show({
                    title: 'Você já faz parte desse bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }
        }
    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton/>
            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontre um bolão através de seu código único
                </Heading>
                <Input mb={2} placeholder="Qual o código do bolão?" onChangeText={setCode} autoCapitalize="characters"/>
                <Button tittle="BUSCAR BOLÃO" isLoading={isLoading} onPress={handleJoingPool}/>
            </VStack>
        </VStack>

    )
}