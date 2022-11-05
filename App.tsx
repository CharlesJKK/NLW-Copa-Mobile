import React, {type PropsWithChildren, useState, useEffect} from 'react';
import { NativeBaseProvider, StatusBar } from "native-base";
import Loading from './src/components/Loading/Loading';
import SignIn from './src/screens/SignIn';

import { THEME } from './src/styles/theme'

const App = () => {

  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {setIsLoading(false)}, 2000)
  }, []);



  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
      {isloading ? <Loading/> : <SignIn/>}
    </NativeBaseProvider>
  );
};

export default App;
