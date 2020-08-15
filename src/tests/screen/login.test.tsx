import React from 'react';
import axios from 'axios';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import LoginScreen from '../../screens/Login';
import loginHooks from '../../screens/Login/hooks';

jest.mock('axios');

describe('#LoginScreen', () => {
  describe('UI', () => {
    beforeEach(() => {
      render(<LoginScreen />);
    });

    it('should render without throw an error', async () => {
      expect(screen.queryByText(/Username/i)).toBeInTheDocument();
    });

    it('should have a form rendered with its input', () => {
      const formHtml = screen.queryByTestId('form');
      expect(formHtml).toBeInTheDocument();
      expect(formHtml?.getElementsByTagName('input')).not.toBeNull();
    });

    it('should start form with button enabled, disabled it when submit and return to the first state', async () => {
      const submitButton = screen.getByTestId('submit-login');
      expect(submitButton).toBeEnabled();

      (axios.get as jest.Mock).mockResolvedValueOnce({
        token: 'stirng',
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
        result.current.setInputsValue({
          password,
          username,
        });
      });

      expect(result.current.inputsValue.password).toEqual(password);
    });
  });
});
