import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { useGetContactsQuery, useAddContactMutation } from "redux/contactsSlice";
import { toast } from 'react-toastify';
import Loader from "components/Loader";
import styled from "styled-components";
import Section from "components/Section";
import { Label, Error, AddBtn } from './ContactForm.styled';

const Input = styled(Field)`
    width: 100%;
    height: 40px;
    padding: ${p => p.theme.space[3]}px;
    margin-bottom: ${p => p.theme.space[4]}px;
    margin-top: ${p => p.theme.space[2]}px;
    outline: none;
    border: ${p => p.theme.borders.none};
    border-radius: ${p => p.theme.radii.normal};

    :hover, :focus {
        border: ${p => p.theme.borders.normal};
        border-color: ${p => p.theme.colors.bgcButton};
    }
`;

const NAME_MATCH = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const nameError = "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
const numberError = "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +";
const requiredError = "This field is required";

const schema = yup.object().shape({
    name: yup.string().required(requiredError).matches(NAME_MATCH, nameError),
    number: yup.string().required(requiredError).matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, numberError),
});

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
            console.log(error);
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