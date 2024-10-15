import { APIProvider } from '@vis.gl/react-google-maps';

export const MapProvider = (props) => {
	const { children } = props;
	const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

	return (
		<APIProvider
			apiKey={API_KEY}
			version={'beta'}
		>
			{children}
		</APIProvider>
	);
};
