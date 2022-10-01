import { useDeleteContactMutation } from "redux/contactsSlice";
import { toast } from 'react-toastify';
import { Button, BtnContainer } from "./Contact.styled";
import Loader from "components/Loader";

const Contact = ({ id, name, phone, openModal }) => { 
    const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

    const handleDelete = async () => {
        try {
            await deleteContact(id);
            toast.success('Contact deleted successfully!');
        } catch (error) {
            toast.error('Something is wrong. Try again');
        }
    }

    return (
        <>
            <p>{name}: {phone}</p>
            <BtnContainer>
                <Button
                    type="button"
                    onClick={() => openModal(id)}
                >Edit
                </Button>
                <Button
                    type="button"
                    onClick={() => deleteContact(id)}
                    disabled={isDeleting}
                >{isDeleting ? <Loader /> : 'Delete' }
                </Button>
            </BtnContainer>
        </>
    );
};

export default Contact;