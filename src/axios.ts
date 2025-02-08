import axios from 'axios';

axios.defaults.baseURL = 'https://cuenta.ovnicom.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
