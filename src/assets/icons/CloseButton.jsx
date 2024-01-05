import * as React from 'react';

export const CloseButton = (props) => {
	return (
		<svg
			viewBox='0 0 24 24'
			strokeWidth={props.strokeWidth}
			width={props.width}
			height={props.height}
			fill={props.fill}
			stroke={props.stroke}
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M16.396 7.757a1 1 0 010 1.415l-2.982 2.981 2.676 2.675a1 1 0 11-1.415 1.415L12 13.567l-2.675 2.676a1 1 0 01-1.415-1.415l2.676-2.675-2.982-2.981A1 1 0 119.02 7.757L12 10.74l2.981-2.982a1 1 0 011.415 0z'
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M4 1a3 3 0 00-3 3v16a3 3 0 003 3h16a3 3 0 003-3V4a3 3 0 00-3-3H4zm16 2H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1z'
			/>
		</svg>
	);
};
