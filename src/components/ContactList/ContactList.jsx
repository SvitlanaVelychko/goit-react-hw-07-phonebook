import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { useGetContactsQuery} from 'redux/contactsSlice';
import { selectFilter } from 'redux/filterSlice';
import Contact from 'components/Contact';
import { Box } from 'components/Box';
import { Contacts, ContactItem, EmptyList } from './ContactList.styled';


const ContactList = () => {
    const { data: contacts, isFetching } = useGetContactsQuery();
    const filter = useSelector(selectFilter);

    const filteredContacts = contacts?.filter(({ name }) =>
        name.toLowerCase().includes(filter));

    return (
        <Contacts>
            {isFetching && (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Oval
                        height="80"
                        width="80"
                        color="#ef0119"
                        ariaLabel='oval-loading'
                    />
                </Box>
            )}
            {filteredContacts?.length > 0 && !isFetching && (filteredContacts.sort((firstName, secondName) =>
                firstName.name.localeCompare(secondName.name)).map(({ id, name, phone }) => (
                    <ContactItem key={id}>
                        <Contact id={id} name={name} phone={phone} />
                    </ContactItem>
                ))
            )}
            {filteredContacts?.length === 0 && (<EmptyList>Your contact list is empty</EmptyList>)}
        </Contacts>
    );
};

export default ContactList;