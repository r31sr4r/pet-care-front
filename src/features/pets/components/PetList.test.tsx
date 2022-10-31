import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Petlist } from './PetList';

const Props = {
	results: undefined,
	handleClick: () => {},
};

const mockData = {
	data: [
		{
			id: 'c53d8c36-3c9e-4a2e-b665-21286829e95a',
			name: 'Test',
			type: 'DOG',
			other_type: '',
			breed: '',
			gender: '',
			birth_date: null,
			microchip: '',
			neutered: false,
			customer_id: 'd545d371-b03d-495a-b35a-be239f210ddd',
			image_url: '',
			is_active: true,
			created_at: '2022-01-01T00:00:00.000Z',
		},
	],
	meta: {
		page: 1,
		per_page: 1,
		total: 1,
        current_page: 1,
        last_page: 1,
	},
};

describe('PeList', () => {
	it('should render successfully', () => {
		const { asFragment } = render(<Petlist {...Props} />, {
			wrapper: BrowserRouter,
		});
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render with results', () => {
		const { asFragment } = render(
			<Petlist {...Props} results={mockData} />,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});

    it('should render with pet breed', () => {
        const { asFragment } = render(
            <Petlist {...Props} results={{ 
                ...mockData,
                data: [
                    {
                        ...mockData.data[0],
                        breed: 'Test Breed',
                    }
                ]
            }} />,
            {
                wrapper: BrowserRouter,
            }
        );
        expect(asFragment()).toMatchSnapshot();    
    });
});
