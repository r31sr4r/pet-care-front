import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PetTypeSelector } from './PetTypeSelector';

const Props = {
    petType: 'DOG',
    handlePetTypeChange: () => {},
};

describe('PetTypeSelector', () => {
    it('should render successfully', () => {
        const { asFragment } = render(<PetTypeSelector {...Props} />, {
            wrapper: BrowserRouter,
        });
        expect(asFragment()).toMatchSnapshot();
    });
});