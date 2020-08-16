import React from 'react';
import axios from 'axios';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { fail } from 'assert';
import LoginScreen from '../../screens/Login';
import loginHooks from '../../screens/Login/hooks';

jest.mock('axios', () => ({
  create: () => ({
    post: async () => ({
      token: 'stirng',
    }),
  }),
}));

describe('#LoginScreen', () => {
  describe('UI', () => {
    beforeEach(() => {
      render(<LoginScreen />);
    });

    it('should render without throw an error', async () => {
      expect(screen.queryByText(/Username/i)).toBeInTheDocument();
    });

    it('should have a form rendered with its input', () => {
      const usernameInput = screen.queryByTestId('username-input');
      const passwordInput = screen.queryByTestId('password-input');
      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('should start with button disabled', () => {
      const submitButton = screen.getByTestId('submit-login');
      expect(submitButton).toBeDisabled();
    });

    it('should start form with button disabled, enable it when inputs are filled, submit and return to the first state', async () => {
      const submitButton = screen.getByTestId('submit-login');
      const usernameInput = screen.queryByTestId('username-input') as HTMLInputElement;
      const passwordInput = screen.queryByTestId('password-input') as HTMLInputElement;

      if (!usernameInput || !passwordInput) {
        fail('Inputs not exists');
      }

      fireEvent.change(passwordInput, { target: { value: 'oi' } });
      fireEvent.change(usernameInput, { target: { value: 'user go' } });

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });

      // Waits the submit ends
      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
    });
  });

  describe('Hooks', () => {
    it('should set password', () => {
      const { result } = renderHook(() => loginHooks());
      const username = 'ff';
      const password = 'gg';
      act(() => {
        result.current.onInputChange({
          // @ts-ignore
          target: {
            name: 'username',
            value: username,
          },
        });
      });

      act(() => {
        result.current.onInputChange({
          // @ts-ignore
          target: {
            name: 'password',
            value: password,
          },
        });
      });

      expect(result.current.inputsValue.password).toEqual(password);
      expect(result.current.inputsValue.username).toEqual(username);
    });
  });
});
