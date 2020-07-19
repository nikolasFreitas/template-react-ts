import {
  Reducer,
  useReducer,
  useEffect,
} from 'react';
import { AxiosResponse } from 'axios';
import { RequestObject } from './types';

export interface ApiRequestState {
  isLoading: boolean;
  success: boolean;
  isRequested: boolean;
}

// type EncapsuledRequestWithHooks<T, K extends keyof T> =
//   Record<K, (...args: any[]) => Promise<T[K]>>;

type EncapsuledRequestWithHooks<T> = { [K in keyof T] :(...args: any[]) => Promise<T[K]> };

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
  let newState = { ...prevState };
  switch (action) {
    case apiRequestActions.REQUEST:
      newState = {
        ...prevState,
        isLoading: true,
      };
      break;
    case apiRequestActions.RESET:
      newState = defaultState;
      break;

    default:
      console.info(`action ${action.toString()} does not exist`);
      break;
  }

  return {
    ...prevState,
    ...newState,
  };
};

const prepareObject = <T extends RequestObject> (requestModel: T,
  dispatch: React.Dispatch<apiRequestActions>): EncapsuledRequestWithHooks<T> => {
  const keys = Object.keys(requestModel);
  const refillObject: RequestObject = {};

  keys.forEach((key) => {
    refillObject[key] = async (...args: any) => {
      let res;
      try {
        dispatch(apiRequestActions.REQUEST);
        res = await requestModel[key](...args);
        dispatch(apiRequestActions.SET_SUCCESS);
      } catch (error) {
        dispatch(apiRequestActions.SET_ERROR);
      }
      return res;
    };
  });

  return refillObject as EncapsuledRequestWithHooks<T>;
};

export default <T extends RequestObject> (requestModel: T) => {
  const [state, dispatch] = useReducer(reducer, defaultState, init);

  useEffect(() => {
    if (state.isLoading && !state.isRequested) {
      // log
    }
  }, [state]);

  return {
    state,
    request: prepareObject<T>(requestModel, dispatch),
  };
};
