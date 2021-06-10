import './ProductCard.scss';

import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Rating from 'src/components/Rating/Rating';
import Product from 'src/models/product.model';
import { applyMaskMoneyAG } from 'src/utils/functions';

import { faHeart as unfilledHearth } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHearth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ProductCardProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	product: Product;
}

const ProductCard = (props: ProductCardProps) => {
	const { product, ...commonProps } = props;
	const [isFavorite, setIsFavorite] = useState(false);

	function handleFavoriteProduct() {
		setIsFavorite(!isFavorite);
	}

	function handleRatingProduct(ratingValue: number) {}

	return (
		<div
			{...commonProps}
			className={`product-card-container ${commonProps.className || ''}`}
		>
			<div className='product-card-header-container px-3 py-2 d-flex justify-content-between'>
				<Rating onChange={handleRatingProduct} />
				<ReactTooltip effect='solid' />
				<FontAwesomeIcon
					className='pointer-on-hover favorite-icon'
					onClick={handleFavoriteProduct}
					icon={isFavorite ? filledHearth : unfilledHearth}
					data-tip={isFavorite ? 'Desfavoritar produto' : 'Favoritar produto'}
				/>
			</div>
			<div className='product-card-body-container text-left px-3 py-2'>
				<img
					src={product.thumbnail}
					alt={product.title}
					className='product-image my-5'
				/>
				<small className='gray-color'>{product.id}</small>
				<h4 className='mb-3 iron-color'>{applyMaskMoneyAG(product.price)}</h4>
				{product.shipping.free_shipping && (
					<div className='success-custom-badge px-3 mb-3'>Frete Grátis</div>
				)}
				<p className='lead-color'>{product.title}</p>
			</div>
		</div>
	);
};

export default ProductCard;
