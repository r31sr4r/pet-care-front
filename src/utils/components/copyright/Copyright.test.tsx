import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Copyright } from './Copyright';

describe('Copyright', () => {
    it('should render successfully', () => {
        const { asFragment } = render(<Copyright />, {
        	wrapper: BrowserRouter, 
        });
        expect(asFragment()).toMatchSnapshot();                
    });
});