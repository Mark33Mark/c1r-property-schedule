import { useEffect } from 'react';
import {
	useMap,
	AdvancedMarker,
	Map,
	useApiLoadingStatus,
	APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { MapAustAndNz, CsrMapIcon } from '../../assets';

export const Mapped = (props) => {
	const map = useMap();
	const status = useApiLoadingStatus();

	const center = { lat: parseFloat(props?.lat), lng: parseFloat(props?.lon) };

	useEffect(() => {
		const consoleStyle = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid lightblue; padding: 0.5em; font-size: 1.25em;'

		switch (status) {
		case APILoadingStatus.NOT_LOADED:
			console.log("%c⏱️ \nwaiting for Google Maps to load.", consoleStyle);
			break;

		case APILoadingStatus.LOADING:
			console.log("%c⚒️ \nGoogle Maps is attempting to load.", consoleStyle);
			break;

		case APILoadingStatus.LOADED:
			console.log("%c✅ \nGoogle Maps has loaded.", consoleStyle);
			break;

		case APILoadingStatus.FAILED:
			console.log("%c👎🏼 \nError: visgl/react-google-maps failed to load.", consoleStyle);
			break;

		case APILoadingStatus.AUTH_FAILURE: 
			console.log("%c👎🏼 \nError: Google Maps authentication failed, check with developer.", consoleStyle);
			break;

		default:
			return;
	}
	}, [status]);

	useEffect(() => {
		if (!map) return;
		map.setCenter(center);
		map.setZoom(17);
	}, [props]);

	return (
		<>
			{center.lat || center.lng ? (
				<Map
					mapId={'CSR_locations'}
					gestureHandling={'greedy'}
					disableDefaultUI={false}
					reuseMaps={false}
					defaultCenter={center}
					defaultZoom={17}
				>
					<AdvancedMarker
						position={center}
						title={'CSR property location.'}
					>
						<CsrMapIcon
							width={48}
							height={48}
						/>
					</AdvancedMarker>
				</Map>
			) : (
				<MapAustAndNz className='map__image' />
			)}
		</>
	);
};
