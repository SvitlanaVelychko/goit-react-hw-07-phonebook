import { Formik, Form, ErrorMessage } from "formik";
import { useGetContactsQuery, useAddContactMutation } from "redux/contactsSlice";
import { toast } from 'react-toastify';
import Loader from "components/Loader";
import Section from "components/Section";
import { NAME_MATCH, nameError, numberError, schema } from "constants";
import { Input, Label, Error, AddBtn } from './ContactForm.styled';

const initialValues = {
    name: '',
    number: '',
};

const ContactForm = () => {
    const { data: contacts } = useGetContactsQuery();
    const [addContact, { isLoading }] = useAddContactMutation();

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const form = e.currentTarget.elements;
            const name = form.name.value;
            const number = form.number.value;
        
            const matcheContactName = contacts.find(contact =>
                contact.name.toLowerCase() === name.toLowerCase());
            const newContact = {
                name,
                phone: number,
            };

            if (matcheContactName) {
                toast.warn(`Sorry, ${name} is already in your contacts`);
                return;
            } else {
                await addContact(newContact);
                toast.success('Contact added successfully!');
                e.target.reset();
            }
        } catch (error) {
            toast.error('Something is wrong. Try again');
        }
    };


    return (
        <Section >
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
            >
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Label htmlFor="name">Name
                        <Input
                            type="text"
                            name="name"
                            pattern={NAME_MATCH}
                            required
                        />
                        <ErrorMessage name="name" render={msg => <Error>{nameError}</Error>} />
                    </Label>
                    <Label htmlFor="number">Number
                        <Input
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            required
                        />
                        <ErrorMessage name="number" render={msg => <Error>{numberError}</Error>} />
                    </Label>
                    <AddBtn type="submit">{isLoading ? <Loader /> : 'Add contact'}</AddBtn>
                </Form>
            </Formik>
        </Section>
    );
};

export default ContactForm;