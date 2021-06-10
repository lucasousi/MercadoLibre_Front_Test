import IDNamePair from './id-name-pair.model';

export default interface SellerAddress {
	id: string;
	comment: string;
	address_line: string;
	zip_code: string;
	country: IDNamePair;
	state: IDNamePair;
	city: IDNamePair;
	latitude: string;
	longitude: string;
}
