import './Catalog.scss';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import Header from 'src/components/Header/Header';
import PaginationComponent from 'src/components/Pagination/Pagination';
import ProductCard from 'src/components/ProductCard/ProductCard';
import IDNamePair from 'src/models/id-name-pair.model';
import Product, { GetProductParams } from 'src/models/product.model';
import useCategoryService from 'src/services/category.service';
import useProductService from 'src/services/product.service';

export interface CatalogLocationState {
	query?: string;
	product?: Product;
}

const Catalog = () => {
	const { getCategories } = useCategoryService();
	const { getProducts } = useProductService();
	const [isLoadingCategories, setIsLoadingCategories] = useState(true);
	const [isLoadingProducts, setIsLoadingProducts] = useState(true);
	const [page, setPage] = useState(0);
	const [itemsPerPage] = useState(12);
	const [products, setProducts] = useState([] as Product[]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [categories, setCategories] = useState([] as IDNamePair[]);
	const [productsCount, setProductsCount] = useState(0);
	const [activeFilters, setActiveFilters] = useState({
		offset: page,
		limit: itemsPerPage,
	} as GetProductParams);

	useEffect(() => {
		getCategoriesFromService();
	}, []);

	function _setPageAndSearch(value: number) {
		const _activeFilters = {
			...activeFilters,
			page: value,
		} as GetProductParams;
		setActiveFilters(_activeFilters);
		getProductsFromService(_activeFilters);
		setPage(value);
	}

	function _setSelectedCategory(value: string) {
		const _activeFilters = {
			...activeFilters,
			category: value,
		} as GetProductParams;
		setActiveFilters(_activeFilters);
		getProductsFromService(_activeFilters);
		setSelectedCategory(value);
	}

	async function getCategoriesFromService() {
		try {
			setIsLoadingCategories(true);
			const { data } = await getCategories();
			setCategories(data.data);
			const _firstCategoryId = data.data[0].id;
			_setSelectedCategory(_firstCategoryId);
		} catch (ex) {
			console.log(ex);
		} finally {
			setIsLoadingCategories(false);
		}
	}

	async function getProductsFromService(params: GetProductParams) {
		try {
			setIsLoadingProducts(true);
			const { data } = await getProducts({ ...params });
			const { results } = data.data;
			const _results = results.map((item) => {
				item.is_favorite = false;
				return item;
			});
			data?.data && params?.offset === 0
				? setProducts(_results)
				: setProducts([...products, ..._results]);

			setProductsCount(data?.data.paging.total);
		} catch (ex) {
			console.log(ex);
		} finally {
			setIsLoadingProducts(false);
		}
	}

	function handleSearchSelect(selected: Product) {
		setPage(0);
		setSelectedCategory('');
		const _activeFilters: GetProductParams = {
			...activeFilters,
			offset: 0,
			q: selected.title,
		};
		delete _activeFilters.category;
		setActiveFilters(_activeFilters);
		getProductsFromService(_activeFilters);
	}

	function handleViewMoreSearch(query: string) {
		setPage(0);
		setSelectedCategory('');
		const _activeFilters: GetProductParams = {
			...activeFilters,
			offset: 0,
			q: query,
		};
		delete _activeFilters.category;
		setActiveFilters(_activeFilters);
		getProductsFromService(_activeFilters);
	}

	function handleClearSearchInput() {
		setPage(0);
		setSelectedCategory(categories[0].id);
		const _activeFilters: GetProductParams = {
			...activeFilters,
			offset: 0,
			category: categories[0].id,
		};
		delete _activeFilters.q;
		setActiveFilters(_activeFilters);
		getProductsFromService(_activeFilters);
	}

	function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
		const _categoryId = e.currentTarget.value;
		_setSelectedCategory(_categoryId);
	}

	function onPagination(rawPageNum: number) {
		_setPageAndSearch(rawPageNum);
	}

	return (
		<>
			<Header
				onSearchSelect={handleSearchSelect}
				onSearchViewMoreClick={handleViewMoreSearch}
				onSearchClearClick={handleClearSearchInput}
			/>
			<section className='catalog-container router-min-full-height'>
				<div className='container py-2 px-3 px-sm-4'>
					<div className='row'>
						<div className='col-12 d-flex flex-wrap justify-content-end catalog-items-container'>
							{isLoadingCategories ? (
								<Skeleton
									count={1}
									height='40px'
									className='p-1 col-12 catalog-skeleton'
								/>
							) : (
								<div
									className={`col-12 p-2 filter-container d-flex justify-content-end`}
								>
									<div className='filter col-12 col-md-6 col-lg-4 h-100 px-0 py-4'>
										<Form>
											<Form.Label>
												<strong>Filtar por Categoria</strong>
											</Form.Label>
											<Form.Control
												as='select'
												onChange={handleCategoryChange}
												value={selectedCategory}
											>
												<option value=''>Nenhuma categoria selecionada</option>
												{categories?.map((item) => (
													<option
														className='my-2'
														key={item.id}
														value={item.id}
													>
														{item.name}
													</option>
												))}
											</Form.Control>
										</Form>
									</div>
								</div>
							)}
							{!!itemsPerPage && !!productsCount && (
								<div className='col-12 gray-color px-0'>
									Total de itens encontrados: {productsCount}
								</div>
							)}
							<div className='col-12 p-0 d-flex flex-wrap text-right products-container'>
								{isLoadingProducts ? (
									<Skeleton
										count={12}
										height={440}
										className='p-1 col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 catalog-skeleton'
									/>
								) : (
									products?.map((item, index) => (
										<div
											key={index}
											className='col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 p-2'
										>
											<ProductCard product={item} />
										</div>
									))
								)}
							</div>
							<div className='pagination-container col-12 m-3 d-flex justify-content-end'>
								{productsCount > itemsPerPage && (
									<PaginationComponent
										activePage={page}
										totalPages={Math.ceil(productsCount / itemsPerPage) || 0}
										onPageClick={(selectedPage) => onPagination(selectedPage)}
										onGoToFirstClick={() => onPagination(0)}
										onGoBackClick={() => onPagination(page - 1)}
										onGoNextClick={() => onPagination(page + 1)}
									></PaginationComponent>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Catalog;
