import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, getContacts, getFilter } from 'redux/contactsSlice';
import { Contacts, ContactItem, DeleteBtn } from './ContactList.styled';

const ContactList = () => {
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    const filteredContacts = contacts.filter(({name}) =>
        name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <Contacts>
            {filteredContacts.map(({id, name, number}) => (
                <ContactItem key={id}>
                    <p>{name}: {number}</p>
                    <DeleteBtn
                        type="button"
                        onClick={() => dispatch(deleteContact(id))}
                    >Delete contact
                    </DeleteBtn>
                </ContactItem>
            ))}
        </Contacts>
    );
};

export default ContactList;