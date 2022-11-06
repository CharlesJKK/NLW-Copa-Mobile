import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base"

interface props extends IButtonProps {
    tittle: string;
    type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({tittle, type, ...rest}: props){
    return(
        <ButtonNativeBase w="full" h={14} rounded="sm" fontSize="md" textTransform="uppercase" bg={type === 'SECONDARY' ? 'red.600' : 'yellow.500'}
         _pressed={{bg: type === 'SECONDARY' ? 'red.500' : 'yellow.600'}} {...rest}>
            <Text fontSize="sm" fontFamily="heading" color={type === 'SECONDARY' ? 'white' : 'black'}>{tittle}</Text>
        </ButtonNativeBase>
    )
}