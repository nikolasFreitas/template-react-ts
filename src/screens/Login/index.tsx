import React from 'react';
import * as Styled from './style';
import withForm from './hooks';

export default () => {
  const hooks = withForm();

  return (
    <Styled.Container>
      <Styled.LoginBox>
        <form data-testid="form" onSubmit={hooks.saveUser}>
          <Styled.InputWrapper>
            <label htmlFor="username-input">
              <span>Username</span>
              <input
                data-testid="username-input"
                value={hooks.inputsValue.username}
                name="username"
                id="username-input"
                onChange={hooks.onInputChange}
                type="text"
              />
            </label>
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <label htmlFor="password-input">
              <span>password</span>
              <input
                data-testid="password-input"
                value={hooks.inputsValue.password}
                name="password"
                id="password-input"
                onChange={hooks.onInputChange}
                type="password"
              />
            </label>
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <button
              data-testid="submit-login"
              type="submit"
              disabled={hooks.requestState.isLoading || !hooks.isValid}
            >
              Login
              {hooks.requestState.isLoading && '...'}
            </button>
          </Styled.InputWrapper>
        </form>
        {hooks.requestState.isRequested && !hooks.requestState.success && (
          <Styled.ErrorMessage> deu erro aqui </Styled.ErrorMessage>
        )}
      </Styled.LoginBox>
    </Styled.Container>
  );
};
