import { createContext, ReactNode, useEffect } from "react";
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
        GoogleSignin.configure({
        webClientId: CLI_ID_GOOGLE, // client ID of type WEB for your server (needed to verify user ID and offline access)
      });
},[])

    const signIn = async () => {
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo.idToken)
    }


    return(
        <AuthContext.Provider value={{signIn, user:{ name: 'Charles', avatarUrl: 'https://github.com/CharlesJKK.png'}}}>
            {children}
        </AuthContext.Provider>
    )
}