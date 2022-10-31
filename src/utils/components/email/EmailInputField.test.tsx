import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EmailInputField } from './EmailInputField';

const Props = {
    emailValue: '',
    handleEmailChange: () => {},
};

describe('EmailInputField', () => {
    it('should render successfully', () => {
        const { asFragment } = render(<EmailInputField {...Props} />, {
            wrapper: BrowserRouter,
        });
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render with a invalid email', () => {
        const { asFragment } = render(<EmailInputField {...Props} emailValue='mail@mail@.com'/>, {
            wrapper: BrowserRouter,
        });
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render with a valid email', () => {
        const { asFragment } = render(<EmailInputField {...Props} emailValue='mail@mail.com'/>, {
            wrapper: BrowserRouter,
        });
        expect(asFragment()).toMatchSnapshot();
    });
    
});