import { useCallback, useEffect } from 'react';
import { FeatureMarker } from './FeatureMarker';
import { FeaturesClusterMarker } from './FeaturesClusterMarker';
import { useSupercluster } from '../../hooks';

const superclusterOptions = {
	extent: 256,
	radius: 40,
	maxZoom: 12,
};

export const ClusteredMarkers = (props) => {
	const { geojson, setNumClusters, setInfowindowData } = props;
	const { clusters, getLeaves } = useSupercluster(geojson, superclusterOptions);

	useEffect(() => {
		setNumClusters(clusters.length);
	}, [setNumClusters, clusters.length]);

	const handleClusterClick = useCallback(
		(marker, clusterId) => {
			const leaves = getLeaves(clusterId);
			setInfowindowData({ anchor: marker, features: leaves });
		},
		[getLeaves, setInfowindowData]
	);

	const handleMarkerClick = useCallback(
		(marker, featureId) => {
			const feature = clusters.find((feat) => feat.id === featureId);
			setInfowindowData({ anchor: marker, features: [feature] });
			``;
		},
		[clusters, setInfowindowData]
	);

	return (
		<>
			{clusters.map((feature) => {
				const [lng, lat] = feature.geometry.coordinates;

				const clusterProperties = feature.properties;
				const isCluster = clusterProperties.cluster;

				return isCluster ? (
					<FeaturesClusterMarker
						key={feature.id}
						clusterId={clusterProperties.cluster_id}
						position={{ lat, lng }}
						size={clusterProperties.point_count}
						sizeAsText={String(clusterProperties.point_count_abbreviated)}
						onMarkerClick={handleClusterClick}
					/>
				) : (
					<FeatureMarker
						key={feature.id}
						business={clusterProperties.business}
						holding={clusterProperties.holding}
						featureId={feature.id}
						position={{ lat, lng }}
						onMarkerClick={handleMarkerClick}
					/>
				);
			})}
		</>
	);
};
