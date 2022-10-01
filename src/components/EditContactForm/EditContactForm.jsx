import { Formik, Form, ErrorMessage } from "formik";
import { useGetContactByIdQuery } from "redux/contactsSlice";
import Loader from "components/Loader";
import Section from "components/Section";
import { NAME_MATCH, nameError, numberError, schema } from "constants";
import { Input, Label, Error, UpdateBtn } from './EditContactForm.styled';

const EditContactForm = ({ id, onClose, onSubmit, nameValue, phoneValue}) => {
    const { data: contact, isLoading } = useGetContactByIdQuery(id);

    const handleSubmit = async (values, actions) => {
        try {
            await onSubmit(values);
        } catch (error) {
            console.log(error)
        }
    };

    const initialValues = {
    name: nameValue,
    phone: phoneValue,
};

    return (
        <Section>
            <CloseBtn onClick= {closeModal} />
            {isLoading || isUpdateLoading ? (<Loader />) :
                (<Formik
                    initialValues = {initialValues}
                    validationSchema={schema}>
                    <Form autoComplete="off" onSubmit={handleUpdateContact}>
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
                        <UpdateBtn type="submit">
                            {isUpdateLoading ? <Loader /> : 'Update'}
                        </UpdateBtn>
                    </Form>
                </Formik>)}
        </Section>
    );
};

export default EditContactForm;