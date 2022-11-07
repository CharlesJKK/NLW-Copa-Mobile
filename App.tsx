import React, {type PropsWithChildren, useState, useEffect} from 'react';
import { NativeBaseProvider, StatusBar } from "native-base";
import Loading from './src/components/Loading/Loading';
import SignIn from './src/screens/SignIn';
import { THEME } from './src/styles/theme'
import { AuthContextProvider } from './src/context/AuthContext';



const App = () => {

  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {setIsLoading(false)}, 2000)
  }, []);



  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
        {isloading ? <Loading/> : <SignIn/>}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
};

export default App;
