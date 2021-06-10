import './Header.scss';

import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from 'src/assets/images/logo.png';
import Product from 'src/models/product.model';

import GlobalProductSearch from '../GlobalProductSearch/GlobalProductSearch';

export interface HeaderProps {
	onSearchSelect: (selected: Product) => void;
	onSearchClearClick: () => void;
	onSearchViewMoreClick: (query: string) => void;
}

const Header = (props: HeaderProps) => {
	const { onSearchSelect, onSearchClearClick, onSearchViewMoreClick } = props;

	// async function handleLogout() {
	// 	const response = await postLogout();
	// 	if (response) {
	// 		toast.success('Encerrando sessão do usuário...', {
	// 			autoClose: 1900,
	// 			position: DEFAULT_TOAST_POSITION,
	// 		});
	// 		setTimeout(() => {
	// 			history.push('/login');
	// 		}, 2000);
	// 	}
	// }

	function handleSearchSelect(selected: Product) {
		onSearchSelect && onSearchSelect(selected);
	}

	function handleViewMoreSearch(query: string) {
		onSearchViewMoreClick && onSearchViewMoreClick(query);
	}

	function handleClearSearchInput() {
		onSearchClearClick && onSearchClearClick();
	}

	return (
		<header className='header-container d-flex align-items-center'>
			<div className='container'>
				<div className='row'>
					<Navbar className='navbar-container col-12 p-0' expand='lg'>
						<div className='col-12 col-md-3 col-lg-2 logo-container'>
							<Navbar.Brand
								className='mr-0 mr-md-5 pointer-on-hover'
								onClick={() => window.location.reload()}
							>
								<img src={logo} alt='Mercado Livre' className='ml-logo' />
							</Navbar.Brand>
						</div>
						<div className='col-12 col-md-9 col-lg-10'>
							<GlobalProductSearch
								onSelect={handleSearchSelect}
								onViewMoreClick={handleViewMoreSearch}
								onClearClick={handleClearSearchInput}
							/>
						</div>
					</Navbar>
				</div>
			</div>
		</header>
	);
};

export default Header;
