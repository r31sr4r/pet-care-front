import { SortDirection } from './SortDirection';


export interface Results {
    items:       Item[];
    total:       number;
    current_page: number;
    last_page:    number;
    per_page:     number;
}

export interface Result {
    items:       Item;
    total:       number;
    current_page: number;
    last_page:    number;
    per_page:     number;
}

export interface Item {
    id:          string;
    name:        string;
    type:        string;
    description: null;
    is_active:    boolean;
    created_at:   Date;
}

export interface SearchParams {
	page?: number;
	per_page?: number;
	sort?: string;
	sort_dir?: SortDirection;
	filter?: string;
}
