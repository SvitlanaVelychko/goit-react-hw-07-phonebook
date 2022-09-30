import { ThreeDots } from 'react-loader-spinner';
import { Box } from 'components/Box';

const Loader = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <ThreeDots
                height="50"
                width="50"
                color="#ef0119"
                ariaLabel = 'three-dots-loading'
            />
        </Box>
    );
};

export default Loader;