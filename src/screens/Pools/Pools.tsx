import React, { useEffect, useState } from 'react';
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Button } from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native'
import { api } from "../../api/api";
import { PoolCard, PoolCardProps } from '../../components/PoolCard/PoolCard';
import { ActivityIndicator } from "react-native";
import { EmptyPoolList } from '../../components/EmptyPoolList/EmptyPoolList';

export default function Pools(){

    const toast = useToast();
    const [loading, setIsloading] = useState(true);
    const [pools, setPools] = useState<PoolCardProps[]>([]);
    const {navigate} = useNavigation();

    
    async function getPools(){
        try{    
            setIsloading(true);
            const res = await api.get('/pools');
            setPools(res.data.pools)

        }catch(error){
            console.log(error)
            toast.show({
                title: 'Erro ao carregar os bolões!',
                placement: 'bottom-right',
                bgColor: 'red.500'
            })
        }finally{       
            setTimeout(() => {setIsloading(false)}, 1000);
        }
    }

    useEffect(() => {
        getPools();
    }, [])

    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões"/>
            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button  onPress={() => navigate('findpool')} tittle="BUSCAR BOLÃO POR CÓDIGO" leftIcon={<Icon as={AntDesign} name="search1" color="black" size="md"/> }/>
            </VStack>
            {loading 
            ?
            <ActivityIndicator color='yellow' style={{top: '30%'}}/>
            :
            <FlatList
            data={pools}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (<PoolCard data={item} onPress={() => navigate('details', {id: item.id})}/>)}
            px={5}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{pb: 10}}
            ListEmptyComponent={<EmptyPoolList/>}
            />}
        </VStack>
    )
}