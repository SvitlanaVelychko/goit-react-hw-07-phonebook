import styled from "styled-components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import Section from "./Section";
import { GlobalStyle } from "./GlobalStyle";
import { Box } from "./Box";

const PageTitle = styled.h1`
  text-align: center;
  font-size: ${p => p.theme.fontSizes.xl};
  color: ${p => p.theme.colors.text};
`;

export const App = () => { 
  return (
    <Box as="main"
      maxWidth="600px"
      m="32px auto"
      p={4}
      borderRadius="8px"
      boxShadow="0px 5px 10px 2px rgba(45, 90, 124, 0.2)"
      backgroundColor="bgc"
    >
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        theme={'colored'}
        closeOnClick
      />
      <PageTitle>Phonebook</PageTitle>
      <ContactForm />
      <Section title="Contacts">
        <Filter />
        <ContactList />
      </Section>
    </Box>
  );
};