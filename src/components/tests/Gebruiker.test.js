import React from 'react';
import {render, screen,cleanup} from '@testing-library/react';
import Gebruiker from '../Gebruiker';
import '@testing-library/jest-dom/extend-expect'

test('should render Gebruiker component', () => {
    render(<Gebruiker/>);
    const gebruikerElement = screen.getByTestId('user1');
    expect(gebruikerElement).toBeInTheDocument();
})

test('test',()=>{
    expect(true).toBe(true);
})