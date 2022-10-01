import styled from "styled-components";

export const BtnContainer = styled.div`
    display: flex;
    gap: ${p => p.theme.space[4]}px;
`;

export const Button = styled.button`
    width: 80px;
    height: 40px;
    border: ${p => p.theme.borders.none};
    border-radius: ${p => p.theme.radii.normal};
    font-weight: ${p => p.theme.fontWeights.bold};
    background-color: ${p => p.theme.colors.delBtn};
    box-shadow: -4px 4px 59px 0px rgba(50,140,17,1);
    cursor: pointer;
    transition: background-color 250ms cubic-bezier(0.2, 0, 0, 0.7),
    color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

    :hover:not(:disabled), :focus:not(:disabled) {
        background-color: ${p => p.theme.colors.accent};
        color: ${p => p.theme.colors.white};
        transform: scale(1.1);
    }
`;