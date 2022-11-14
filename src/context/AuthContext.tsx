import { createContext, ReactNode, useEffect, useState } from "react";
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { api } from '../api/api'
import { env } from 'react-native-dotenv'

interface UserProps {
    name: string;
    avatarUrl: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const CLI_ID_GOOGLE = Platform.OS == 'ios' ? "" : process.env.CLIENT_ID


export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthProviderProps){

    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false)

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: CLI_ID_GOOGLE,
        })
    },[])

    const signIn = async () => {

        try{
            const userLogin = await GoogleSignin.signIn();

            
            const userInfo = await GoogleSignin.getTokens();

            setIsUserLoading(true);

            const tokenResponse = await api.post('/users',{ access_token: userInfo.accessToken });

            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

            const userInfoResponse = await api.get('/me');
            setUser(userInfoResponse.data.user)

        }catch(error){
            console.log(error);
            throw error;
        }finally{
            setIsUserLoading(false)
        }
    }


    return(
        <AuthContext.Provider value={{signIn, user, isUserLoading}}>
            {children}
        </AuthContext.Provider>
    )
}