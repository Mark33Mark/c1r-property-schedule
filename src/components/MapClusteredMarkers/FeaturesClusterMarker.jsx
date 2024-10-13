import { useCallback } from "react";
import {
	AdvancedMarker,
	useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { CsrIcon, } from "../../assets/icons";

export const FeaturesClusterMarker = (props) => {
	const { position, size, sizeAsText, onMarkerClick, clusterId } = props;
	const [markerRef, marker] = useAdvancedMarkerRef();
	const handleClick = useCallback(() => {
		onMarkerClick && onMarkerClick(marker, clusterId);
	}, [onMarkerClick, marker, clusterId]);
	const markerSize = Math.floor(75 + Math.sqrt(size) * 2);

	return (
		<AdvancedMarker
			ref={markerRef}
			position={position}
			zIndex={size}
			onClick={handleClick}
			className={"marker cluster"}
			style={{ width: markerSize, height: markerSize }}
		>
			<CsrIcon />
			<span>{sizeAsText}</span>
		</AdvancedMarker>
	);
};
