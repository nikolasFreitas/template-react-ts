import {
  useState,
  useEffect,
} from 'react';

import { LoginApi } from '../../service';
import ApiRequestHooks from '../../service/apiRequestHooks';

const localSave = (token: string) => {
  window.localStorage.setItem('user-token', token);
};

export default () => {
  const { state: requestState, request } = ApiRequestHooks(LoginApi);

  const [inputsValue, setInputsValue] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    console.log('Hooks of request:', requestState);
  }, [requestState]);

  const saveUser = async () => {
    if (!!inputsValue.username && !!inputsValue.password) {
      try {
        const res = await request.login(inputsValue.username, inputsValue.password);
        localSave(res.token);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    requestState,
    saveUser,
    inputsValue,
    setInputsValue,
  };
};
