import {render, screen,cleanup,fireEvent,waitFor} from '@testing-library/react';
import Profiel from '../Profiel';
import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

test('should render Profiel component', () => {
    render(<Profiel/>);
    const gebruikerElement = screen.getByTestId('user1');
    expect(gebruikerElement).toBeInTheDocument();
})

test('testing getAll function', async() => {
    render(<Profiel/>);
    const buttonElement = screen.getByText(/Zie alle gebruikers/i);
    expect(buttonElement).toBeInTheDocument();
    //jest.mock('fetch', () => require('./__mocks__/fetch'));
    fireEvent.click(buttonElement);
    const divElement = screen.getByText('Gebruikers');
    expect(divElement).toBeInTheDocument();
    //expect(divElement).toHaveLength(3);
})

test('testing getProductsFromUser', async() => {
    render(<Profiel/>);
    const buttonElement = screen.getByText(/Zie alle gebruikers/i);
    expect(buttonElement).toBeInTheDocument();
    //jest.mock('fetch', () => require('./__mocks__/fetch'));
    fireEvent.click(buttonElement);
    const divElement = screen.getByText(/Producten/i);
    expect(divElement).toBeInTheDocument();
    //expect(divElement).toHaveLength(1); 
})

test('test',()=>{
    expect(true).toBe(true);
})