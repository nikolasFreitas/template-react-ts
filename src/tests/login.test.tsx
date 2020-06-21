import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import LoginScreen from '../screens/Login';

describe('#LoginScreen', () => {
  jest.useFakeTimers();
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

      act(() => {
        fireEvent.click(submitButton);
      });

      expect(submitButton).toBeDisabled();

      // Waits the submit ends

      act(() => {
        jest.runAllTimers();
      });
      expect(submitButton).toBeEnabled();
    });
  });

  describe('Hooks', () => {

  });
});
