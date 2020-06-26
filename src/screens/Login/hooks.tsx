import {
  useState, useReducer,
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

  if (isSubmitting) {
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  }

  return {
    submitStatus: {
      isSubmitting,
      setIsSubmitting,
    },
    inputsValue,
    setInputsValue,
  };
};
