import Styled from 'styled-components';

export const Container = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--dark);
  height: 100vh;
`;

export const LoginBox = Styled.div`
  background: var(--red);
  width: 100%;
  max-width: 250px;
  padding: 15px;
`;

export const InputWrapper = Styled.div`
  label {
    display: flex;
    flex-flow: column;
    align-items: start;
    color: white;
  }
  &:not(first-child) {
    margin-top: 15px;
  }
`;

export const ErrorMessage = Styled.span`
  color: red;
`;
