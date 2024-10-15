import { useCallback, useState } from 'react';
import { InfoWindow, Map } from '@vis.gl/react-google-maps';
import { useGetPropertiesQuery } from '../../store/slices';
import { ClusteredMarkers } from './ClusteredMarkers';
import { InfoWindowContent } from './InfoWindowContent';
import { MapProvider } from '../Property';
import { useTitle } from '../../hooks';
import secureLocalStorage from 'react-secure-storage';

// import { loadGeoJson } from '../../utils';

export const MapClusteredMarkers = () => {
	const [infowindowData, setInfowindowData] = useState(null);
	const [_, setNumClusters] = useState(0);

	//  const [geojson, setGeojson] = useState(null);

	// use to import a test JSON from assets folder
	// useEffect(() => {
	// 	loadGeoJson().then((data) => {
	// 		setGeojson(data);
	// 		// console.log('geojson = ', data)
	// 	});
	// }, []);

	useTitle('CSR: Global View');

	// RTK Query already polled query when user logged in,
	// handled in <Prefetch /> component
	const { properties } = useGetPropertiesQuery('propertiesList', {
		selectFromResult: ({ data }) => ({
			properties: data,
		}),
	});

	const cachedPropertyList = secureLocalStorage.getItem('propertyList');

	let deserializedContent;

	if (properties || cachedPropertyList) {
		const { ids, entities } = properties || cachedPropertyList;

		deserializedContent =
			ids?.length && ids.map((propertyId) => entities[propertyId]);
	}

	// convert deserialized data into Geo format for consumption
	// by the Supercluster dependency
	const geoObject = {
		type: 'FeatureCollection',
		features: [...deserializedContent],
	};

	// console.log('properties list = ', geoObject);

	const handleInfoWindowClose = useCallback(
		() => setInfowindowData(null),
		[setInfowindowData]
	);

	const bounds = {
		latLngBounds: {
			north: -2,
			south: -50,
			east: 182,
			west: 105,
		},
	};

	return (
		<MapProvider >
			<Map
				mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
				defaultCenter={{ lat: 20, lng: 20 }}
				defaultZoom={1}
				gestureHandling={"greedy"}
				disableDefaultUI={false}
				className={"custom-marker-clustering-map"}
				restriction={bounds}
			>
				{geoObject && (
					<ClusteredMarkers
						geojson={geoObject}
						setNumClusters={setNumClusters}
						setInfowindowData={setInfowindowData}
					/>
				)}

				{infowindowData && (
					<InfoWindow
						onClose={handleInfoWindowClose}
						anchor={infowindowData.anchor}
					>
						<InfoWindowContent features={infowindowData.features} />
					</InfoWindow>
				)}
			</Map>
		</MapProvider>
	);
};
