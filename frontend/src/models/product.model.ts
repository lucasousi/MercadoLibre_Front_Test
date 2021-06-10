import { Address } from 'cluster';

import AvailableFilter from './available-filter.model';
import IDNamePair from './id-name-pair.model';
import Installments from './installments.model';
import Price from './price.model';
import { PaginatedRequest } from './request.model';
import SellerAddress from './seller-address.model';
import Seller from './seller.model';
import Shipping from './shipping.model';
import Struct from './struct.model';

export interface GetProductParams extends PaginatedRequest {
	q?: string;
	category?: string;
	seller_id?: string;
	nickname?: string;
}

export interface GetProductResponseBody {
	site_id: string;
	query: string;
	paging: ProductResponsePaging;
	results: Product[];
	secondary_results: any[];
	related_results: any[];
	sort: IDNamePair;
	available_sorts: IDNamePair[];
	filters: any[];
	available_filters: AvailableFilter[];
}

export default interface Product {
	id: string;
	site_id: string;
	title: string;
	seller: Seller;
	price: number;
	prices: ProductPrices;
	sale_price?: any;
	currency_id: string;
	available_quantity: number;
	sold_quantity: number;
	buying_mode: string;
	listing_type_id: string;
	stop_time: string;
	condition: string;
	permalink: string;
	thumbnail: string;
	thumbnail_id: string;
	accepts_mercadopago: boolean;
	installments: Installments;
	address: Address;
	shipping: Shipping;
	seller_address: SellerAddress;
	attributes: ProductAttribute[];
	original_price: number;
	category_id: string;
	official_store_id?: any;
	domain_id: string;
	catalog_product_id: string;
	tags: string[];
	catalog_listing: boolean;
	order_backend: number;
	is_favorite?: boolean;
}

interface ProductAttribute {
	source: number;
	value_id?: string;
	values: ProductAttributeValue[];
	value_name: string;
	value_struct?: Struct;
	attribute_group_id: string;
	attribute_group_name: string;
	id: string;
	name: string;
}

interface ProductAttributeValue {
	struct?: Struct;
	source: number;
	id?: string;
	name: string;
}

interface ProductPrices {
	id: string;
	prices: Price[];
	presentation: ProductPresentation;
	payment_method_prices: any[];
}

interface ProductPresentation {
	display_currency: string;
}

interface ProductResponsePaging {
	total: number;
	primary_results: number;
	offset: number;
	limit: number;
}
