import React, {type PropsWithChildren, useState, useEffect} from 'react';
import { NativeBaseProvider, StatusBar } from "native-base";
import Loading from './src/components/Loading/Loading';
import SignIn from './src/screens/SignIn';
import NewPool from './src/screens/NewPool/NewPool';
import Pools from './src/screens/Pools/Pools';
import FindPool from './src/screens/FindPool/FindPool';
import { THEME } from './src/styles/theme'
import { AuthContextProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';



const App = () => {

  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {setIsLoading(false)}, 2000)
  }, []);



  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
        {isloading ? <Loading/> : <Routes/>}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
};

export default App;
