import {
  useState, useReducer, useEffect, useRef,
} from 'react';

export interface InputReducerState {
  username: string,
  password: string,
}

export interface InputReducerAction {
  username?: string,
  password?: string,
}

export default () => {
  const [inputsValue, setInputsValue] = useReducer((s: InputReducerState, a: InputReducerAction) => ({ ...s, ...a }), {
    username: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorMessage = useRef('');

  if (isSubmitting) {
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  }

  useEffect(() => {
    if (isSubmitting) {
      if (!inputsValue.password || !inputsValue.username) {
        errorMessage.current = 'Was submitted with errors';
      } else {
        errorMessage.current = '';
      }
    }
  }, [isSubmitting]);

  return {
    submitStatus: {
      isSubmitting,
      setIsSubmitting,
    },
    inputsValue,
    setInputsValue,
    errorMessage: errorMessage.current,
  };
};
