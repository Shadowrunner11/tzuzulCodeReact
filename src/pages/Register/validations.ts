import * as yup from 'yup';
import { basicSchemConfig } from '../Login/validation';

const namesOptions =  yup
  .string()
  .required()
  .min(3)
  .matches(/[a-zA-Z]/);

const schema = yup.object({
  ...basicSchemConfig,
  birthdate: yup.date().required(),
  gender: yup.string().required(),
  lastname: namesOptions,
  name: namesOptions,
  password2: yup
    .string()
    .required()
  //   .equals(yup.ref('password')),
  ,
  username: yup
    .string()
    .required()
    .min(5)

}).required();

export default schema;