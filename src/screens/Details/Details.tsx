import React, { useState, useEffect } from 'react';
import { VStack, Center, Spinner, useToast } from "native-base";
import { Header } from "../../components/Header/Header";
import { useRoute } from '@react-navigation/native';
import {api} from '../../api/api'

interface RouteParams {
    id: string;
}

export default function Details(){

    const toast = useToast();
    const [isLoading, setIsloading] = useState(true);
    const route = useRoute();
    const { id } = route.params as RouteParams;

    async function getPoolDetails(){
        try{
            setIsloading(true);

            const res = await api.get(`/pools/${id}`);
            console.log(res.data.pool)

        }catch(error){
            console.log(error)
            toast.show({
                title: 'Erro ao carregar os detalhes do bolão!',
                placement: 'bottom-right',
                bgColor: 'red.500'
            })
        }finally{
            setIsloading(false);
        }
    }

    useEffect(() => {
        getPoolDetails();
    }, []);

    if(isLoading){
        return (
            <Center flex={1} bg="gray.900">
                <Spinner color="yellow.500" size={50}/>
            </Center>
        )
    }

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Título do bolão" showBackButton showShareButton/>
        </VStack>
    )
}