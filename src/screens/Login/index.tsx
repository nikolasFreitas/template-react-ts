import React from 'react';
import * as Styled from './style';
import customHooks from './hooks';

export default () => {
  const hooks = customHooks();
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    hooks.submitStatus.setIsSubmitting(true);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    hooks.setInputsValue({ [e.target.name]: e.target.value });
  };

  return (
    <Styled.Container>
      <Styled.LoginBox>
        <form data-testid="form" onSubmit={onSubmitHandler}>
          <Styled.InputWrapper>
            <label htmlFor="username-input">
              <span>Username</span>
              <input value={hooks.inputsValue.username} name="username" id="username-input" onChange={onChangeHandler} type="text" />
            </label>
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <label htmlFor="password-input">
              <span>password</span>
              <input value={hooks.inputsValue.password} name="password" id="password-input" onChange={onChangeHandler} type="password" />
            </label>
          </Styled.InputWrapper>
          <Styled.InputWrapper>
            <button data-testid="submit-login" type="submit" disabled={hooks.submitStatus.isSubmitting}>
              Login
              {hooks.submitStatus.isSubmitting && '...'}
            </button>
          </Styled.InputWrapper>
        </form>
        <Styled.ErrorMessage> deu erro aqui </Styled.ErrorMessage>
      </Styled.LoginBox>
    </Styled.Container>
  );
};
