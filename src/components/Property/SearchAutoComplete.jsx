import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export const SearchAutoComplete = (props) => {
	const { handleOnSelect, propertyItems } = props;

    const formatResult = (item) => {
		return (
			<div className='result-wrapper'>
				<span className='result-span'>{item.address.street} </span>
				<span className='result-span'> {item.address.suburb},</span>
				<span className='result-span'> {item.address.state} </span>
			</div>
		);
	};

	return (
		<ReactSearchAutocomplete
			items={propertyItems}
			fuseOptions={{
				keys: ['address.suburb', 'address.street', 'address.state'],
			}} // Search on both fields
			resultStringKeyName='business' // String to display in the results
			onSelect={handleOnSelect}
			// onSearch={handleOnSearch}
			// onHover={handleOnHover}
			// onFocus={handleOnFocus}
			// onClear={handleOnClear}
			formatResult={formatResult}
			showIcon={false}
			styling={{
				height: '48px',
				// border: '1px solid darkgreen',
				borderRadius: '8px',
				backgroundColor: 'white',
				boxShadow: 'none',
				hoverBackgroundColor: 'lightgreen',
				color: 'darkgreen',
				fontSize: '20px',
				fontFamily: 'inherit',
				iconColor: 'green',
				lineColor: 'lightgreen',
				placeholderColor: 'darkgreen',
				clearIconMargin: '3px 8px 0 0',
				zIndex: 15,
			}}
			autofocus
		/>
	);
};
