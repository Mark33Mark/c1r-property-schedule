export const differenceInDates = (futureDate) => {
	
    // One day Time in ms (milliseconds)
	const oneDay = 1000 * 60 * 60 * 24;

	// establish present day
	let presentDate = new Date();

	// calculate the result in milliseconds and convert into days
	let result = Math.round(
		(futureDate.getTime() - presentDate.getTime()) / oneDay
	);

	// Remove the decimals from the 'result'
	let finalResult = result.toFixed(0);

	return finalResult + " days";
};
