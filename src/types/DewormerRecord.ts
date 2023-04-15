import { Pet } from './Pet';
import { SortDirection } from './SortDirection';
import { Brand } from './Brand';

export interface Results {
    meta: Meta
    data: DewormerRecord[];
}

export interface Result {
    meta: Meta
    data: DewormerRecord;
}

export interface Meta {    
    total:       number;
    current_page: number;
    last_page:    number;
    per_page:     number;
}

export interface DewormerRecord {
	id: string;
	pet_id: string;
	brand_id: string;
	dewormer_name: string;
	booster_interval: number;
	booster_unit: string;
	was_applied: boolean;
	application_date: string | null | undefined;
	booster_date: string | null | undefined;
	notes: string | null;
	clinic: string | null;
	vet: string | null;
	update_reason: string | null;	
	created_at: string | null;
	pet: Pet | null;
	brand: Brand | null;
}

export interface SearchParams {
	page?: number;
	per_page?: number;
	sort?: string;
	sort_dir?: SortDirection;
	filter?: string;
}