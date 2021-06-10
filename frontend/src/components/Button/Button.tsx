import './Button.scss';

import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

interface CustomButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	variant: 'primary' | 'secondary' | 'success' | 'iron';
	isLoading?: boolean;
	icon?: ReactNode;
	containerClass?: string;
	outlined?: boolean;
	uppercaseText?: boolean;
}

const Button = (props: CustomButtonProps) => {
	const {
		isLoading,
		children,
		icon,
		containerClass,
		variant,
		outlined,
		className,
		uppercaseText = true,
		...buttonProps
	} = props;
	return (
		<div className={`custom-button-container ${containerClass || ''}`}>
			<button
				className={`custom-button ${
					uppercaseText ? 'uppercase' : ''
				} w-100 d-flex align-items-center justify-content-center variant-${variant} ${
					outlined && 'outlined'
				} ${className}`}
				{...buttonProps}
			>
				{isLoading && (
					<span
						className='spinner-border spinner-border-sm mx-2'
						role='status'
						aria-hidden='true'
					></span>
				)}{' '}
				{!isLoading && !!icon && <div>{icon}</div>}
				{children}
			</button>
		</div>
	);
};

export default Button;
