import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDeleteContactMutation} from "redux/contactsSlice";
import Loader from "components/Loader";
import { Button} from "./Contact.styled";


const Contact = ({ id, name, phone }) => { 
    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

    const handleDelete = async () => {
        try {
            await deleteContact(id);
            toast.success('Contact deleted successfully!');
        } catch (error) {
            toast.error('Something is wrong. Try again!');
        }
    };

    return (
        <>
            <p>{name}: {phone}</p>
            <Button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
            >{isDeleting ? <Loader /> : 'Delete contact'}
            </Button>
        </>
    );
};

Contact.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
};

export default Contact;