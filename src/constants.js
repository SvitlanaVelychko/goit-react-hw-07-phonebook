import * as yup from 'yup';

export const NAME_MATCH = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
export const nameError = "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
export const numberError = "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +";
const requiredError = "This field is required";

export const schema = yup.object().shape({
    name: yup.string().required(requiredError).matches(NAME_MATCH, nameError),
    number: yup.string().required(requiredError).matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, numberError),
});