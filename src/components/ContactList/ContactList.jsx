import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { useDeleteContactMutation, useGetContactsQuery } from 'redux/contactsSlice';

import { selectFilter } from 'redux/filterSlice';
import { Contacts, ContactItem, DeleteBtn } from './ContactList.styled';

const ContactList = () => {
    const { data: contacts, isFetching} = useGetContactsQuery();
    const [deleteContact, { isLoading: loading }] = useDeleteContactMutation();
    const filter = useSelector(selectFilter);

    const filteredContacts = contacts?.filter(({name}) =>
        name.toLowerCase().includes(filter));

    return (
        <Contacts>
            {isFetching && <Loader />}
            {filteredContacts?.length > 0 && (filteredContacts.map(({ id, name, phone }) => (
                <ContactItem key={id}>
                    <p>{name}: {phone}</p>
                    <DeleteBtn
                        type="button"
                        onClick={() => deleteContact(id)}
                        disabled={loading}
                    >Delete contact
                    </DeleteBtn>
                </ContactItem>
            )))}
        </Contacts>
    );
};

export default ContactList;