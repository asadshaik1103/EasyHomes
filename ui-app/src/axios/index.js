import axios from 'axios';
import { localEnvironment } from '../environment';

export default axios.create({
  baseURL: `${localEnvironment}/`,
});