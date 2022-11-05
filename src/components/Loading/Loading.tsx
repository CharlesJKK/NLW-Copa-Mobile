import {Center, Spinner} from 'native-base';

export default function Loading(){
    return(
        <Center flex={1} bg="green.900">
            <Spinner color="green.500" size={50}/>
        </Center>
    )
}