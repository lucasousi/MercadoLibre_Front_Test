import './GlobalProductSearch.scss';

import React, { useRef, useState } from 'react';
import { AsyncTypeahead, TypeaheadModel } from 'react-bootstrap-typeahead';
import ReactTooltip from 'react-tooltip';
import Product, { GetProductParams } from 'src/models/product.model';
import useProductService from 'src/services/product.service';

export interface GlobalProductSearchProps {
	onSelect: (selected: Product) => void;
	onViewMoreClick: (query: string) => void;
	onClearClick: () => void;
}

export interface RenderMenuProps {
	query: string;
	results: Product[];
	results_amount: number;
	onSelect: (selected: Product) => void;
	onViewMoreClick: (query: string) => void;
}

const RenderMenu = (props: RenderMenuProps) => {
	const { query, results, results_amount, onSelect, onViewMoreClick } = props;
	return (
		<div className='options-container'>
			{results.map((result, index) => (
				<div
					key={index}
					className='option user-selection-none py-2 px-3'
					onClick={() => onSelect(result)}
				>
					{result.title}
				</div>
			))}
			{results_amount ? (
				<div
					className='option view-all-option user-selection-none py-2 px-3'
					onClick={() => onViewMoreClick(query)}
				>
					Ver todos os {results_amount || 0} resultados...
				</div>
			) : (
				<div className='option user-selection-none py-2 px-3'>
					Nenhum resultado encontrado.
				</div>
			)}
		</div>
	);
};

const GlobalProductSearch = (props: GlobalProductSearchProps) => {
	const { onSelect, onViewMoreClick, onClearClick } = props;
	const inputRef = useRef(null as any);
	const { getProducts } = useProductService();
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState([] as Product[]);
	const [selecteds, setSelecteds] = useState([] as TypeaheadModel[]);
	const [productsAmount, setProductsAmount] = useState(0);
	const [showOptions, setShowOptions] = useState(false);
	const [query, setQuery] = useState('');

	async function searchProducts(params: GetProductParams) {
		try {
			setIsLoading(true);
			const { data } = await getProducts({ ...params });
			const { results } = data.data;
			const { total } = data.data.paging;
			setProducts(results);
			setProductsAmount(total);
			setShowOptions(true);
		} catch (ex) {
			console.log(ex);
		} finally {
			setIsLoading(false);
		}
	}

	function handleSearch(query: string) {
		setQuery(query);
		if (query?.length >= 3) {
			searchProducts({
				offset: 0,
				limit: 5,
				q: query,
			});
		} else {
			setShowOptions(false);
		}
	}

	function handleSelectOption(selected: Product) {
		setQuery(selected.title);
		onSelect && onSelect(selected);
		setShowOptions(false);
	}

	function handleViewMoreClick(query: string) {
		onViewMoreClick && onViewMoreClick(query);
		setShowOptions(false);
	}

	function handleClearClick() {
		inputRef?.current?.clear && inputRef?.current?.clear();
		onClearClick && onClearClick();
		setQuery('');
	}

	return (
		<div className='global-product-search-container w-100 py-4 d-flex align-items-center'>
			<div className='custom-input-container w-100 position-relative'>
				{!isLoading && !!query && (
					<div className='clear-button-container text-danger'>
						<ReactTooltip effect='solid' />
						<strong
							data-tip='Limpar busca'
							className='pointer-on-hover'
							onClick={() => handleClearClick()}
						>
							X
						</strong>
					</div>
				)}

				<AsyncTypeahead
					id='global-product-search-input'
					placeholder='Pesquise o produto desejado, informando ao menos 3 letras'
					labelKey='title'
					ref={inputRef}
					isLoading={isLoading}
					options={products}
					minLength={3}
					onChange={(selecteds) => setSelecteds(selecteds)}
					onSearch={handleSearch}
					selected={products.filter((item) => item.title === query)}
					renderMenu={() =>
						showOptions && (
							<RenderMenu
								query={query}
								results={products}
								results_amount={productsAmount}
								onSelect={handleSelectOption}
								onViewMoreClick={handleViewMoreClick}
							/>
						)
					}
					delay={300}
					useCache={false}
				/>
			</div>
		</div>
	);
};

export default GlobalProductSearch;
