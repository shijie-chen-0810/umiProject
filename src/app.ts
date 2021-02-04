import './app.less';
import { ResponseError } from 'umi-request';
export const request = {
  prefix: '/apq',
  errorHandler: (error: ResponseError) => {
    console.log(error);
  },
};
