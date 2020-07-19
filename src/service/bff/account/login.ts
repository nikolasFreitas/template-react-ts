import { AxiosInstance } from 'axios';
import { RequestObject } from '../../types';

export interface LoginResponse {
  token: string;
}

export interface BffIntegration extends RequestObject<BffIntegration> {
  login: (account: string, password: string) => Promise<LoginResponse>;
  gg: () => Promise<void>
}

const routesInstances = (axios: AxiosInstance): BffIntegration => ({
  login: (account: string, password: string): Promise<LoginResponse> => axios.post('/authenticate', {
    account,
    password,
  }),
  gg: () => axios.get('/'),
});

export default routesInstances;
