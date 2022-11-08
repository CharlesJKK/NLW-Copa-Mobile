import { VStack, Icon } from "native-base";
import { Button } from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import AntDesign from "react-native-vector-icons/AntDesign"

export default function Pools(){
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões"/>
            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button tittle="BUSCAR BOLÃO POR CÓDIGO" leftIcon={<Icon as={AntDesign} name="search1" color="black" size="md"/>}/>
            </VStack>
        </VStack>
    )
}