import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => ({
  login: (account: string, password: string) => axios.post('/authenticate', {
    account,
    password,
  }),
});
