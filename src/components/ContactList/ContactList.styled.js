import styled from "styled-components";

export const Contacts = styled.ul`
    list-style-type: disc;
`;

export const ContactItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${p => p.theme.space[4]}px;
    font-size: ${p => p.theme.fontSizes.m};
    font-weight: ${p => p.theme.fontWeights.bold};
    color: ${p => p.theme.colors.text};
`;

export const EmptyList = styled.p`
    font-size: ${p => p.theme.fontSizes.l};
    font-weight: ${p => p.theme.fontWeights.bold};
    color: ${p => p.theme.colors.accent};
    text-align: center;
`;