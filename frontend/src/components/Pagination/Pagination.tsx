import React from 'react';
import { PageItemProps, Pagination } from 'react-bootstrap';

interface PageLinkArrayComponentProps extends PageItemProps {
	firstPage: number;
	maxPage: number;
	activePage: number;
	onPageClick: (selectedPage: number) => void;
}

const PageLinkArrayComponent = (props: PageLinkArrayComponentProps) => {
	const { firstPage, maxPage, activePage, onPageClick, ...commonProps } = props;
	const pageItemsComponent = [] as JSX.Element[];
	for (let pageNumber = firstPage || 1; pageNumber <= maxPage; pageNumber++) {
		pageItemsComponent.push(
			<Pagination.Item
				key={pageNumber}
				active={pageNumber - 1 === activePage}
				onClick={() => onPageClick(pageNumber - 1)}
				{...commonProps}
			>
				{pageNumber}
			</Pagination.Item>,
		);
	}
	return <>{pageItemsComponent}</>;
};

interface PaginationProps {
	totalPages: number;
	activePage: number;
	onPageClick: (selectedPage: number) => void;
	onGoToFirstClick: () => void;
	onGoBackClick: () => void;
	onGoNextClick: () => void;
}

const PaginationComponent = (props: PaginationProps) => {
	const {
		totalPages,
		activePage,
		onPageClick,
		onGoBackClick,
		onGoNextClick,
		onGoToFirstClick,
	} = props;

	return totalPages <= 10 ? (
		<Pagination>
			<PageLinkArrayComponent
				firstPage={1}
				maxPage={totalPages}
				activePage={activePage}
				onPageClick={onPageClick}
			></PageLinkArrayComponent>
		</Pagination>
	) : (
		<Pagination>
			<Pagination.First
				onClick={onGoToFirstClick}
				disabled={activePage === 0}
			/>
			<Pagination.Prev onClick={onGoBackClick} disabled={activePage === 0} />
			<PageLinkArrayComponent
				firstPage={activePage}
				maxPage={activePage + 5 > totalPages ? totalPages : activePage + 5}
				activePage={activePage}
				onPageClick={onPageClick}
			></PageLinkArrayComponent>
			<Pagination.Next
				onClick={onGoNextClick}
				disabled={activePage + 1 >= totalPages}
			/>
		</Pagination>
	);
};

export default PaginationComponent;
