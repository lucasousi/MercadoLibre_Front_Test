import './Rating.scss';

import React, { useState } from 'react';
import useNotificationService from 'src/services/notifications.service';

import { faStar as unfilledStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface RatingProps {
	onChange: (ratingValue: number) => void;
}

const Rating = (props: RatingProps) => {
	const { onChange } = props;
	const { showSuccessToast } = useNotificationService();
	const [amountRatingsAllowed] = useState([1, 2, 3, 4, 5]);
	const [hoveredStar, setHoveredStar] = useState(0);
	const [ratingValue, setRatingValue] = useState(0);

	function handleRatingClick(ratingNumber: number) {
		setRatingValue(ratingNumber);
		showSuccessToast('Agradecemos o seu feedback!');
		onChange && onChange(ratingNumber);
	}

	return (
		<div className='rating-container' onMouseLeave={() => setHoveredStar(0)}>
			{amountRatingsAllowed.map((ratingNumber) => (
				<FontAwesomeIcon
					className='pointer-on-hover primary-color rating-icon'
					key={ratingNumber}
					icon={
						hoveredStar >= ratingNumber || ratingValue >= ratingNumber
							? filledStar
							: unfilledStar
					}
					onMouseEnter={() => setHoveredStar(ratingNumber)}
					onClick={() => handleRatingClick(ratingNumber)}
				/>
			))}
		</div>
	);
};

export default Rating;
