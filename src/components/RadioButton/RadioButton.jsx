import React, { useState, memo } from 'react';
import { RadioList } from './RadioList';

export const RadioButton = memo(function RadioButton({
	item,
	checked,
	onChange,
}) {
	return (
		<label className='custom-radio__label-container'>
			<input
				type='radio'
				value={item.id}
				checked={checked}
				onChange={onChange}
				onClick={onChange}
			/>
			<span className='checkmark' />
			{item.label}
		</label>
	);
});
