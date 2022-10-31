import { SortDirection } from './SortDirection';

export interface Results {
    meta: Meta
    data: Pet[];
}

export interface Result {
    meta: Meta
    data: Pet;
}

export interface Meta {    
    total:       number;
    current_page: number;
    last_page:    number;
    per_page:     number;
}

export interface Pet {
	id: string;
	name: string;
	type: string;
	other_type: string;
	breed: string;
	gender: string;
	birth_date: string | null | undefined;
	microchip: string | null;
	neutered: boolean;
	customer_id: string;
	image_url: string;
	is_active: boolean;
	created_at: string | null;
}

export interface SearchParams {
	page?: number;
	per_page?: number;
	sort?: string;
	sort_dir?: SortDirection;
	filter?: string;
}