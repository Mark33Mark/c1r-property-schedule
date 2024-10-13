import { useCallback, useEffect, useState } from 'react';
import { APIProvider, InfoWindow, Map } from '@vis.gl/react-google-maps';
import { ClusteredMarkers } from './ClusteredMarkers';
import { InfoWindowContent } from './InfoWindowContent';

import { loadGeoJson } from '../../utils';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const MapClusteredMarkers = () => {
	const [infowindowData, setInfowindowData] = useState(null);
	const [geojson, setGeojson] = useState(null);
	const [_, setNumClusters] = useState(0);

	useEffect(() => {
		loadGeoJson().then((data) => {
			setGeojson(data);
			// console.log('geojson = ', data)
		});
	}, []);

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
		<APIProvider
			apiKey={API_KEY}
			version={'beta'}
		>
			<Map
				mapId={'b5387d230c6cf22f'}
				defaultCenter={{ lat: 20, lng: 20 }}
				defaultZoom={1}
				gestureHandling={'greedy'}
				disableDefaultUI={false}
				className={'custom-marker-clustering-map'}
				restriction={bounds}
			>
				{geojson && (
					<ClusteredMarkers
						geojson={geojson}
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
		</APIProvider>
	);
};
