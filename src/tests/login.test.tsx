import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import LoginScreen from '../screens/Login';

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

      fireEvent.click(submitButton);

      expect(submitButton).toBeDisabled();

      // Waits the submit ends
      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      }, {
        timeout: 1500,
      });
    });
  });

  describe('Hooks', () => {

  });
});
