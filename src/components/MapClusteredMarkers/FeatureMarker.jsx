import { useCallback, useMemo, useState, useEffect } from 'react';
import {
	AdvancedMarker,
	useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { matchLogo } from '../../utils';

export const FeatureMarker = (props) => {
	const { business, position, featureId, onMarkerClick, holding } = props;
	const [holdingType, setHoldingType] = useState('');
	const [markerRef, marker] = useAdvancedMarkerRef();

	useEffect(() => {
		setHoldingType(holding);
	}, [holding]);

	const handleClick = useCallback(
		() => onMarkerClick && onMarkerClick(marker, featureId),
		[onMarkerClick, marker, featureId]
	);

	// memoising to business allocations to stop the same icons
	// re-rendering when you zoom in
	const selectLogo = useMemo(() => matchLogo(business), [business]);

	return (
		<AdvancedMarker
			ref={markerRef}
			position={position}
			onClick={handleClick}
			className={'marker feature ' + holdingType}
		>
			{selectLogo}
		</AdvancedMarker>
	);
};
