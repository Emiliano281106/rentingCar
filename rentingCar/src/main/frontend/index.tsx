import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './views/Login';
import FilterBookings from './views/listCars/bookingCar/FilterBookings';
import ListCars from './views/listCars/ListCars';
import HomeView from './views/@index';
import MainLayout from './views/@layout';
import Bookings from './views/bookings';

const router = createBrowserRouter([
    {path: '/', element: <HomeView />},
    {path: '/home', element: <HomeView />},
    {
        element : <MainLayout />,
        children: [
            {path : '/login', element: <LoginPage />},
            {path : '/listCars/FilterBookings', element: <FilterBookings />},
            {path : '/listCars/ListCars', element: <ListCars />},
            {path : '/bookings', element: <Bookings />},
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('outlet')!);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);