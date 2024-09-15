// =====================================================
// https://gist.github.com/papayankey/9573c844025f65cd82ce8e3e36897a9e

let toString = Object.prototype.toString;

// strict object check
const isObject = (value) => {
    return toString.call(value) === "[object Object]";
}

// strict array check
const isArray = (value) => {
    return toString.call(value) === "[object Array]";
}

export const isEmpty = obj =>
    !Object.entries(obj || {}).length && !obj?.length && !obj?.size

/**
 * @author Ben Bright
 * @version 1.0.0
 * A object property filter or picker, with support for nested objects!
 * @param {Object<string, any>} data original object to pick or filter properties from
 * @param {string[]} props array of strings of properties to filter or pick from the original object
 * @return {Object<string, any>} returns new object with filtered properties
 */
export const propPicker = (data = {}, props = []) => {
    // type guard for props parameter
    // ensure it is an array
    if (!isArray(props)) {
        throw new TypeError("Second parameter must be an array");
    }

    // type guard for data parameter
    // ensure it is an object
    if (!isObject(data)) {
        throw new TypeError("first parameter must be an object");
    }

    // the object or result to return
    let output = {};

    // iterate through data
    // to pick properties
    Object.keys(data).forEach((key) => {
        // add key (property) to the result to be
        // returned if it is present on the
        // data object
        if (props.includes(key)) {
        output[key] = data[key];
        }

        // recursive traverse the key (property)
        // if it is an object
        else if (isObject(data[key])) {
        let selectedProps = propPicker(data[key], props);
        let obj;

        // add keys (properties) from nested object
        // if the key is present on the data object
        if (Object.keys(selectedProps).length) {
            obj = {
            [key]: selectedProps,
            };
        }

        // merge main object and keys with
        // nested objects with filtered keys
        output = Object.assign({}, output, obj);
        }
    });

    return output;
}

// ==============================================================


/**
 * Flatten a multidimensional object
 *
 * https://stackoverflow.com/questions/33036487/one-liner-to-flatten-nested-object
 * 
 * For example:
 *   flattenObject{ a: 1, b: { c: 2 } }
 * Returns:
 *   { a: 1, c: 2}
 * 
 */

export const flattenObject = (obj) => {
    const flattened = {};

    Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value));
    } else {
        flattened[key] = value;
    }
    });

    return flattened;
};


// ==============================================================


/**
 * date filter for array of objects with a dates
 *
 * https://stackoverflow.com/questions/39515607/how-can-i-filter-an-array-of-objects-between-two-dates
 * 
 * For example:
 *  data = [
 *           { version: "3.1.1", released_on: "2016-08-21T00:00:00.000Z", high_vulns: 15, medium_vulns: 10, low_vulns: 5 },
 *           { version: "3.1.1", released_on: "2011-08-21T00:00:00.000Z", high_vulns: 15, medium_vulns: 10, low_vulns: 5 },
 *           { version: "3.1.1", released_on: "2009-08-21T00:00:00.000Z", high_vulns: 15, medium_vulns: 10, low_vulns: 5 },
 *           { version: "3.1.1", released_on: "2006-08-21T00:00:00.000Z", high_vulns: 15, medium_vulns: 10, low_vulns: 5 },
 *           { version: "3.1.1", released_on: "2013-08-21T00:00:00.000Z", high_vulns: 15, medium_vulns: 10, low_vulns: 5 },
 *           { version: "3.1.1", released_on: "2017-08-21T00:00:00.000Z", high_vulns: 15, medium_vulns: 10, low_vulns: 5 },
 *           { version: "3.1.1", released_on: "2015-08-21T00:00:00.000Z", high_vulns: 15, medium_vulns: 10, low_vulns: 5 },
 *         ]
 *  
 *       Example date range to filter is between Aug-2010 and Aug-2016
 *  
 *       endDate   = new Date("2016-08-21T00:00:00.000Z").getTime(),
 *       startDate = new Date("2010-08-21T00:00:00.000Z").getTime(),
 *  
 * Returns:
 *         [
 *           { version: "3.1.1", released_on: "2011-08-21T00:00:00.000Z", high_vulns: 15, medium_vulns: 10, low_vulns: 5 },
 *           { version: "3.1.1", released_on: "2013-08-21T00:00:00.000Z", high_vulns: 15, medium_vulns: 10, low_vulns: 5 },
 *           { version: "3.1.1", released_on: "2015-08-21T00:00:00.000Z", high_vulns: 15, medium_vulns: 10, low_vulns: 5 }, 
 *         ]
 *           
 */

export const filterByDateRange = (obj, period) => {

    // 'new Date()' returns today's date and time
    const today = new Date();
    const month = today.getMonth();
    const end = today.setMonth( month + period );

    // console.log('dates = ', {startDate: new Date(), startType: typeof new Date(), endDate: new Date(end), endType: typeof new Date(end), currentMonth: month})

    // you have to use 'var' declaration for this to work - I will refactor in the future.
    var myOptionObj = obj, sd = new Date().getTime(), ed = new Date(end).getTime(), result = obj.filter((d) => {
            var time = new Date(d.exercise).getTime();
            return sd < time && time < ed;
        });
    
    return result;
}

export const filterByExerciseDatePassed = (obj) => {

    // 'new Date()' returns today's date and time
    const today = new Date();

    // you have to use 'var' declaration for this to work - I will refactor in the future.
    var myOptionObj = obj, sd = new Date().getTime(), result = obj.filter((d) => {
            var time = new Date(d.exercise).getTime();
            return sd > time && time !== 0;
        });
    
    return result;
}