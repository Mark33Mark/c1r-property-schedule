import * as React from 'react';

export const PanelOpen = (props) => {
	return (
		<svg
			stroke='currentColor'
			fill='none'
			strokeWidth={2}
			viewBox='0 0 24 24'
			strokeLinecap='round'
			strokeLinejoin='round'
			height='200px'
			width='200px'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<rect
				width={18}
				height={18}
				x={3}
				y={3}
				rx={2}
				ry={2}
			/>
			<path d='M3 9L21 9' />
			<path d='M15 14l-3 3-3-3' />
		</svg>
	);
}
