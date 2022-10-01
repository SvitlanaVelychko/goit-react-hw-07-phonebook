import { Oval } from 'react-loader-spinner';
import { useState, useParams } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useGetContactsQuery, useGetContactByIdQuery, useUpdateContactMutation} from 'redux/contactsSlice';
import { selectFilter } from 'redux/filterSlice';
import Contact from 'components/Contact';
import { Box } from 'components/Box';
import { Contacts, ContactItem, EmptyList } from './ContactList.styled';
import Modal from 'components/Modal';
import EditContactForm from 'components/EditContactForm';

const ContactList = () => {
    const { data: contacts, isFetching} = useGetContactsQuery();
    const filter = useSelector(selectFilter);
    const { contactId } = useParams();
    const { data: contact } = useGetContactByIdQuery(contactId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [updateContact, { isLoading: isUpdateLoading }] = useUpdateContactMutation();

    const filteredContacts = contacts?.filter(({name}) =>
        name.toLowerCase().includes(filter));
    
    const handleUpdateContact = async fields => {
        try {
            await updateContact({...contact, ...fields });
            closeModal();
            toast.success('Contact update successfully');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
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
                            <Contact id={id} name={name} phone={phone} openModal={openModal} />
                        </ContactItem>
                    ))
                )}
                {filteredContacts?.length === 0 && (<EmptyList>Your contact list is empty</EmptyList>)}
            </Contacts>
            {isModalOpen && (
                <Modal closeModal={closeModal}>
                    {contact && 
                        <EditContactForm id={contact.id } nameValue={contact.name} phoneValue={contact.phone} onClose={closeModal} />}
                    <button type="button" closeModal={closeModal}></button>
                </Modal>
            )}
        </>
    );
};

export default ContactList;