import React, { useState } from 'react';
import { RadioButton } from './RadioButton';

export const RadioList = ({ items, updateParent }) => {

    const [value, setValue] = useState(localStorage.getItem('radio1'));

    const onChange = (e) => {
		if (value === e.target.value) {
			setValue(null);
			localStorage.setItem('radio1', null);
            updateParent(null);
		} else {
			setValue(e.target.value);
			localStorage.setItem('radio1', e.target.value);
            updateParent(e.target.value);
		}
	};

	return (
		<div className="custom-radio">
			{items.map((item, i) => (
				<RadioButton
					item={item}
					key={i + item.id}
					checked={item.id === value}
					onChange={onChange}
					onClick={onChange}
				/>
			))}
		</div>
	);
};
