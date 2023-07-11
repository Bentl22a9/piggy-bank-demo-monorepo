import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import BurritoDemo from '../pages/BurritoDemo';
import Layout from '../layouts';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Layout title="Piggy Bank Demo 🐷 + 🔨 = 💰">
        <Home />
      </Layout>
    )
  },
  {
    path: '/burrito-demo',
    element: (
      <Layout title="Burrito Demo">
        <BurritoDemo />
      </Layout>
    )
  }
];

const router = createBrowserRouter(routes);

export default router;
