import React from 'react';
import './App.css';

import { RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import router from './routes';

const App = () => {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
