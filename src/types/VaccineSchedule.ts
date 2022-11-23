import { SortDirection } from './SortDirection';

export interface Results {
    meta: Meta
    data: VaccineSchedule[];
}

export interface Result {
    meta: Meta
    data: VaccineSchedule;
}

export interface Meta {    
    total:       number;
    current_page: number;
    last_page:    number;
    per_page:     number;
}

export interface VaccineSchedule {
	id: string;
	dose: number;
	age: number;
	booster_interval: number;
	booster_unit: string;
	description: string | null;
	vaccine_id: string;	
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