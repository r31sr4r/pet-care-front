import { render } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
    it('should render successfully', () => {
        const { asFragment } = render(<Header />, {
			wrapper: BrowserRouter,
		});
        expect(asFragment()).toMatchSnapshot();
    });
});