import { SortDirection } from './SortDirection';

export interface Results {
    meta: Meta
    data: Brand[];
}

export interface Result {
    meta: Meta
    data: Brand;
}

export interface Meta {    
    total:       number;
    current_page: number;
    last_page:    number;
    per_page:     number;
}

export interface Brand {
	id: string;
	name: string;
	description: string | null;
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