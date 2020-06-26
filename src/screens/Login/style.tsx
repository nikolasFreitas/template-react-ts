import Styled from 'styled-components';

export const Container = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, #D8F4BB 8.79%, #B5D396 100%);
  height: 100vh;
`;

export const LoginBox = Styled.div`
  background: linear-gradient(0.58deg, #35B5DE -64.98%, #32A3C7 91.6%), #C4C4C4;
  width: 100%:
  max-width: 350px;
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
