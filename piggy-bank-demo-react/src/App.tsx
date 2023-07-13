import React from 'react';
import './App.css';

import { RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import router from './routes';
import { Web3Provider } from './context';

const App = () => {
  return (
    <ChakraProvider>
      <Web3Provider>
        <RouterProvider router={router} />
      </Web3Provider>
    </ChakraProvider>
  );
};

export default App;
