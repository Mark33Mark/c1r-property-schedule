// https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta

export const loadGeoJson = async () => {
	const url = new URL("../assets/coOrds.json", import.meta.url);

	return await fetch(url).then((res) => res.json());
}
