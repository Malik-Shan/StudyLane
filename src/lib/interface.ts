export interface Page<T = any> {
	data: T[];
	start: number;
	end: number;
	total: number;
	currentPage: number;
	size: number;
	lastPage: number;
	url: {
		current: string;
		prev: string | undefined;
		next: string | undefined;
		first: string | undefined;
		last: string | undefined;
	}
}
export type Pagination = {
	start: number;
	end: number;
	total: number;
	currentPage: number;
	size: number;
	lastPage: number;
	url: {
		current: string;
		prev: string | undefined;
		next: string | undefined;
		first: string | undefined;
		last: string | undefined;
	}
};
