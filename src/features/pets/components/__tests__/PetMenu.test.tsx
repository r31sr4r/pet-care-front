import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PetMenu } from '../PetMenu';

const Props = {
    petId: '78c15db6-8ce1-460b-9bd7-2dca5e9bfa9d',
    handleClick: () => {},
};

describe('PetMenu', () => {
    it('should render successfully', () => {
        const { asFragment } = render(<PetMenu {...Props} />, {
            wrapper: BrowserRouter,
        });
        expect(asFragment()).toMatchSnapshot();
    });
});