import { createContext, ReactNode, useEffect, useState } from "react";
import { Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface UserProps {
    name: string;
    avatarUrl: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const CLI_ID_GOOGLE = Platform.OS == 'ios' ? "" : "536961710722-0njap8sm846commv42gh7md2qet3jlj5.apps.googleusercontent.com"


export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthProviderProps){


    useEffect(() => {
},[])

    const signIn = async () => {
        const userInfo = await GoogleSignin.getTokens();
        console.log(userInfo.accessToken)
    }


    return(
        <AuthContext.Provider value={{signIn, user:{ name: `teste`, avatarUrl: 'https://github.com/CharlesJKK.png'}}}>
            {children}
        </AuthContext.Provider>
    )
}