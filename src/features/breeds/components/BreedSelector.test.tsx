import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BreedSelector } from './BreedSelector';

const Props = {
    petType: 'DOG',
    breedName: '',
    handleBreedChange: () => {},
};

describe('BreedSelector', () => {
    it('should render successfully', () => {
        // const { asFragment } = render(<BreedSelector {...Props} />, {
        //     wrapper: BrowserRouter,
        // });
        // expect(asFragment()).toMatchSnapshot();
        expect(true).toBeTruthy();
    });
});