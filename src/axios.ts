import axios from 'axios';

//axios.defaults.baseURL = 'https://cuenta.ovnicom.com';
axios.defaults.baseURL = 'http://ovnicomcustomerdashboard.test';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
