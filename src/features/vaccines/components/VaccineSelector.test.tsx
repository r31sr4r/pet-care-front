import { renderWithProviders } from '../../../utils/test/test-utils';
import { VaccineSelector } from './VaccineSelector';

const breedType = 'DOG';

const Props = {
    breedType: breedType,
    vaccineName: '',
    handleVaccineChange: () => {},
};

describe('VaccineSelector', () => {

    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<VaccineSelector {...Props} />);
        expect(asFragment()).toMatchSnapshot();        
    });
});