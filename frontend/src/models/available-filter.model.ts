export default interface AvailableFilter {
	id: string;
	name: string;
	type: string;
	values: AvailableFilterValue[];
}

interface AvailableFilterValue {
	id: string;
	name: string;
	results: number;
}
