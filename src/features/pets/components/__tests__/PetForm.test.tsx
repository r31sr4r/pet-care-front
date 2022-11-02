import { renderWithProviders } from '../../../../utils/test/test-utils';
import { PetForm } from '../PetForm';

const Props = {
	pet: {
		id: 'c53d8c36-3c9e-4a2e-b665-21286829e95a',
		name: 'Test',
		type: 'DOG',
		other_type: '',
		breed: '',
		gender: 'male',
		birth_date: null,
		microchip: '',
		neutered: false,
		customer_id: 'd545d371-b03d-495a-b35a-be239f210ddd',
		image_url: '',
		is_active: true,
		created_at: '2022-01-01T00:00:00.000Z',
	},
	petType: 'DOG',
	breedName: '',
	isLoading: false,
	isDisabled: false,
	handleSubmit: () => {},
	handleChange: () => {},
	handleToggle: () => {},
	handlePetTypeChange: () => {},
	handlePetGenderChange: () => {},
	handlePetBirthDateChange: () => {},
	handleBreedChange: () => {},
	handleNeuteredChange: () => {},
};

describe('PetForm', () => {
	it('should render successfully', () => {
		const { asFragment } = renderWithProviders(<PetForm {...Props} />);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render successfully without gender', () => {
		const { asFragment } = renderWithProviders(
			<PetForm {...Props} pet={{ ...Props.pet, gender: '' }} />
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render successfully with loading', () => {
		const { asFragment } = renderWithProviders(
			<PetForm {...Props} isLoading={true} />
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
