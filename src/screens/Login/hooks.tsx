import {
  useState,
} from 'react';

import { LoginApi } from '../../service';

const localSave = (token: string) => {
  window.localStorage.setItem('user-token', token);
};

// TODO
/*
  Fazer a hook de erros
 */
export default () => {
  const [inputsValue, setInputsValue] = useState({
    username: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isSubmitting) {
    try {
      // const response = await LoginApi.login(inputsValue.username, inputsValue.password);
      // localSave(response.data.token);
    } catch (error) {
      console.error(error);
    }
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
