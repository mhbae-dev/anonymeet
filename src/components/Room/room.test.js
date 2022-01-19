import React from 'react';
import { render, screen } from '@testing-library/react';
import Room from "./Room";
import {BrowserRouter, MemoryRouter, Route, Router,} from "react-router-dom";


const roomRender = () => {    
render(
    <MemoryRouter initialEntries={[{
        "pathname": "/room/:qouu3s9740c",
        "search": "",
        "hash": "",
        "state": {
            "roomData": {
                "roomID": "qouu3s9740c",
                "startDate": "2022-01-12",
                "endDate": "2022-01-19",
                "friendCount": "3",
                "roomFormsRatings": [Array(0), Array(0), Array(0)]
            }
        },
        "key": "k4g2ctxm",
        "params": {
            "roomidnum": ":qouu3s9740c",
            "pathname": "/room/:qouu3s9740c",
            "pathnameBase": "/room/:qouu3s9740c"
        }
    }]}>
         <Room />
    </MemoryRouter>
)};

it('renders Room Correctly', () => {
    roomRender();
    expect(screen.getByText(/Welcome to your room!/i)).toBeInTheDocument()
})

it('renders the correct number of buttons based on friend count', () => {
    roomRender();
    expect(screen.getByRole('button',{name: /Response 4/i})).toBeInTheDocument(); 
})


