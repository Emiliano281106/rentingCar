import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './views/Login';
import FilterBookings from './views/listCars/bookingCar/FilterBookings';
import ListCars from './views/listCars/ListCars';
import HomeView from './views/@index';
import MainLayout from './views/@layout';
import Bookings from './views/userBookings';
import BookingCar from './views/listCars/bookingCar/:idHashBookingCar';
import SuccessfulBooking from './views/listCars/bookingCar/SuccessfulBooking';


const router = createBrowserRouter([
    {path: '/', element: <HomeView />},
    {path: '/home', element: <HomeView />},
    {
        element : <MainLayout />,
        children: [
            {path : '/login', element: <LoginPage />},
            {path : '/listCars/bookingCar/FilterBookings', element: <FilterBookings />},
            {path : '/listCars/ListCars', element: <ListCars />},
            {path : '/userBookings', element: <Bookings />},
            {path : '/listCars/bookingCar/:idHashBookingCar', element: <BookingCar />},
            {path : '/listCars/bookingCar/SuccessfulBooking', element: <SuccessfulBooking />},

        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('outlet')!);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);