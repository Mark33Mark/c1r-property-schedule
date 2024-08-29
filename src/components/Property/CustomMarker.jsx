import { CsrMapIcon } from '../../assets';
import {
	AdvancedMarker,
} from '@vis.gl/react-google-maps';

export const CustomMarker = (props) => {

    const { position } = props;

    // console.log('center from CustomMarker = ', position);

    return (
        <AdvancedMarker
        position={position}
        title={'CSR property location.'}
    >
        <CsrMapIcon
            width={48}
            height={48}
        />
    </AdvancedMarker>
    )
}