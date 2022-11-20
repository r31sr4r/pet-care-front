import { SortDirection } from './SortDirection';

export interface Results {
    meta: Meta
    data: Vaccine[];
}

export interface Result {
    meta: Meta
    data: Vaccine;
}

export interface Meta {    
    total:       number;
    current_page: number;
    last_page:    number;
    per_page:     number;
}

export interface Vaccine {
	id: string;
	name: string;
	breed_type: string;
	description: string | null;
	booster_recommendation: string | null;
	comments: string | null;	
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