import { Oval } from 'react-loader-spinner';
import { Box } from 'components/Box';

const Loader = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Oval
                height="20"
                width="20"
                color="#ef0119"
                ariaLabel = 'oval-loading'
            />
        </Box>
    );
};

export default Loader;