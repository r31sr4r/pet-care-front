import { renderWithProviders } from '../../../utils/test/test-utils';
import { BreedSelector } from './BreedSelector';

const Props = {
    petType: 'DOG',
    breedName: '',
    handleBreedChange: () => {},
};

describe('BreedSelector', () => {
    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<BreedSelector {...Props} />);
        expect(asFragment()).toMatchSnapshot();        
    });
});