import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ActionAreaCard from './SelectUserType';

describe('SelectUserType', () => {
    it('should render successfully', () => {
        const { asFragment } = render(<ActionAreaCard />, {
        	wrapper: BrowserRouter, 
        });
        expect(asFragment()).toMatchSnapshot();                
    });
});