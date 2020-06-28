import {
  Reducer,
  useReducer,
  useEffect,
} from 'react';
import { AxiosInstance } from 'axios';

export interface ApiRequestState {
  isLoading: boolean;
  success: boolean;
  isRequested: boolean;
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

const apiRequestHelper = async (requestModel: (() => AxiosInstance)),
  dispatch: React.Dispatch<apiRequestActions>) => {
  

};

const prepareObject = <T extends object>(requestModel: T,
  dispatch: React.Dispatch<apiRequestActions>): Record<keyof T, Function> => {
  const keys = Object.keys(requestModel);
  const refillObject = {};

  keys.forEach((key) => { Object.assign(refillObject, { [key]: () => {} }); });

  return refillObject as Record<keyof T, Function>;
};

export default <T extends object>(requestModel: T) => {
  const [state, dispatch] = useReducer(reducer, defaultState, init);

  useEffect(() => {
    if (state.isLoading && !state.isRequested) {

    }
  }, [state]);

  return {
    state,
    ...prepareObject(requestModel, dispatch),
  };
};
