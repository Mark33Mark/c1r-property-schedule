import { constants } from '../config';

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

export const differenceInDatesDetailed = (futureDate) => {

	const { locale, dateOnlyFormatShort } = constants[0];
	
	// establish present day
	let presentDate = new Date();

	const diff = Math.floor(futureDate.getTime() - presentDate.getTime());
    const day = 1000 * 60 * 60 * 24;

    const days = Math.floor(diff/day);

	const years = Math.floor(days / 365);
    const months = Math.floor(days % 365 / 30);
    const daysBal = Math.floor(days % 365 % 30);

    const yearsDisplay = years > 0 ? years + (years === 1 ? " year + " : " years + ") : "";
    const monthsDisplay = months > 0 ? months + (months === 1 ? " month + " : " months + ") : "";
    const daysDisplay = daysBal > 0 ? daysBal + (daysBal === 1 ? " day " : " days ") : "";

    let message = futureDate.toLocaleDateString(locale, dateOnlyFormatShort);

	message += " ⇒  "
    message += yearsDisplay 
    message += monthsDisplay
    message += daysDisplay

    return message
};

export const differenceInDatesPast = (pastDate) => {

	const { locale, dateOnlyFormatShort } = constants[0];
	
	// establish present day
	let presentDate = new Date();

	const diff = Math.floor(presentDate.getTime() - pastDate.getTime());
    const day = 1000 * 60 * 60 * 24;

    const days = Math.floor(diff/day);

	const years = Math.floor(days / 365);
    const months = Math.floor(days % 365 / 30);
    const daysBal = Math.floor(days % 365 % 30);

    const yearsDisplay = years > 0 ? years + (years === 1 ? " year + " : " years + ") : "";
    const monthsDisplay = months > 0 ? months + (months === 1 ? " month + " : " months + ") : "";
    const daysDisplay = daysBal > 0 ? daysBal + (daysBal === 1 ? " day until expiry" : " days since lease commenced.") : "";

    let message = pastDate.toLocaleDateString(locale, dateOnlyFormatShort);
	
	message += " ⇒  "
    message += yearsDisplay 
    message += monthsDisplay
    message += daysDisplay

    return message
};

export const extractOptionArray = (optionsArray) => {

	let message = " ";

	if (!optionsArray || optionsArray.length <= 0 ) {
		
		return message = " ";

	} else {

		optionsArray.map(( option ) => {
		
			if ( optionsArray.length === 1 ) {

				return message = option + option === 1 ? option + " year  " : option + " years  ";

			} else {

				return message += option + option === 1 ? option + " year, " : option + " years, ";

			}
		})
	}

	message = message.substring(0, message.length - 2);

    return message
};

export const countOptionArray = (optionsArray) => {

	if (!optionsArray || optionsArray.length <= 0 ) {
		
		return "nil  ";

	} else {
		
		if ( optionsArray.length === 1 ) {

			return optionsArray.length + " option";

		} else {

			return optionsArray.length + " options";;

		}
	}
};