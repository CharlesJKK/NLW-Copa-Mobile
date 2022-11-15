import React, { useState, useEffect } from 'react';
import { Share } from 'react-native'
import { VStack, Center, Spinner, useToast, HStack } from "native-base";
import { Header } from "../../components/Header/Header";
import { useRoute } from '@react-navigation/native';
import {api} from '../../api/api'
import { PoolCardProps } from '../../components/PoolCard/PoolCard';
import { PoolHeader } from '../../components/PoolHeader/PoolHeader';
import { EmptyMyPoolList } from '../../components/EmptyMyPoolList/EmptyMyPoolList'
import { Option } from '../../components/Option/Option'
import { Guesses } from '../../components/Guesses/Guesses'
import { EmptyRakingList } from '../../components/EmptyRakingList/EmptyRakingList';

interface RouteParams {
    id: string;
}

export default function Details(){

    const toast = useToast();
    const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')
    const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);
    const [isLoading, setIsloading] = useState(true);
    const route = useRoute();
    const { id } = route.params as RouteParams;

    async function getPoolDetails(){
        try{
            setIsloading(true);

            const res = await api.get(`/pools/${id}`);
            setPoolDetails(res.data.pool);

        }catch(error){
            console.log(error)
            toast.show({
                title: 'Erro ao carregar os detalhes do bolão!',
                placement: 'top',
                bgColor: 'red.500'
            })
        }finally{
            setIsloading(false);
        }
    }

    async function handleCodeShare(){
        await Share.share({
            message: poolDetails.code
        })
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
            <Header title={poolDetails.tittle} showBackButton showShareButton onShare={handleCodeShare}/>
            {poolDetails._count?.participants > 0 ? 
            <VStack px={5} flex={1}>
                <PoolHeader data={poolDetails}/>
                <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                    <Option title='Seus palpites' isSelected={optionSelected === 'guesses'} onPress={() => setOptionSelected('guesses')}/>
                    <Option title='Ranking do grupo' isSelected={optionSelected === 'ranking'} onPress={() => setOptionSelected('ranking')}/>
                </HStack>
                {optionSelected == 'guesses' ? <Guesses poolId={poolDetails.id} code={poolDetails.code}/> : <EmptyRakingList/>}
            </VStack>
            :
            <EmptyMyPoolList code={poolDetails.code}/>
            }
        </VStack>
    )
}