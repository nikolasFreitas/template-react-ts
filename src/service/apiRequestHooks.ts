import {
  Reducer,
  useReducer,
  useEffect,
} from 'react';

import { RequestObject } from './types';

export interface ApiRequestState {
  isLoading?: boolean;
  success?: boolean;
  isRequested?: boolean;
}

export enum apiRequestActions {
  REQUEST,
  SET_ERROR,
  SET_SUCCESS,
  RESET,
}

const defaultState: ApiRequestState = {
  isLoading: false,
  success: false,
  isRequested: false,
};

const init = () => defaultState;

const reducer: Reducer<ApiRequestState, apiRequestActions> = (prevState, action) => {
  let newState: ApiRequestState = {};
  switch (action) {
    case apiRequestActions.REQUEST:
      newState = {
        isLoading: true,
        isRequested: true,
      };
      break;
    case apiRequestActions.SET_ERROR:
      newState = {
        isLoading: false,
      };
      break;

    case apiRequestActions.SET_SUCCESS:
      newState = {
        isLoading: false,
        success: true,
      };
      break;

    case apiRequestActions.RESET:
      newState = defaultState;
      break;

    default:
      console.info(`action ${action} does not exist`);
      break;
  }

  return {
    ...prevState,
    ...newState,
  };
};

type Generic = { [key: string]: (...args: any[]) => Promise<any>};

type keys<T> = keyof T;

const prepareObject = <T extends RequestObject<T>> (requestModel: T,
  dispatch: React.Dispatch<apiRequestActions>): T => {
  const keys = Object.keys(requestModel) as keys<T>[];
  const refillObject: Generic = {};

  keys.forEach((key) => {
    refillObject[key as string] = async (...args: T[keyof T][]) => {
      let res;
      try {
        dispatch(apiRequestActions.REQUEST);
        res = await requestModel[key](...args);
        dispatch(apiRequestActions.SET_SUCCESS);
      } catch (error) {
        dispatch(apiRequestActions.SET_ERROR);
        console.error(error);
        throw error;
      }
      return res;
    };
  });

  return refillObject as T;
};

export default <T extends RequestObject<T>> (requestModel: T) => {
  const [state, dispatch] = useReducer(reducer, defaultState, init);

  return {
    state,
    request: prepareObject<T>(requestModel, dispatch),
  };
};
