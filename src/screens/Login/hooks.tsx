import {
  useState,
  useEffect,
  useRef,
} from 'react';

import { LoginApi } from '../../service';
import ApiRequestHooks from '../../service/apiRequestHooks';

const localSave = (token: string) => {
  window.localStorage.setItem('user-token', token);
};

export default () => {
  const { state: requestState, request } = ApiRequestHooks(LoginApi);
  const isValid = useRef(false);

  const [inputsValue, setInputsValue] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (!!inputsValue.username && !!inputsValue.password) {
      isValid.current = true;
    }
  }, [inputsValue]);

  const saveUser = async () => {
    if (isValid.current) {
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
    isValid: isValid.current,
  };
};
