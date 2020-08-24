import React, { useState, useEffect } from 'react';

import { LoginApi } from '../../service';
import ApiRequestHooks from '../../service/apiRequestHooks';

const localSave = (token: string) => {
  window.localStorage.setItem('user-token', token);
};

export default () => {
  const { state: requestState, request } = ApiRequestHooks(LoginApi);
  const [isValid, setisValid] = useState(false);

  const [inputsValue, setInputsValue] = useState({
    username: '',
    password: '',
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setInputsValue((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    if (inputsValue.username && inputsValue.password) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [inputsValue]);

  const saveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      try {
        const res = await request.login(
          inputsValue.username,
          inputsValue.password,
        );
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
    onInputChange,
    isValid,
  };
};
