import * as yup from 'yup';

export const basicSchemConfig = {
  email: yup
    .string()
    .email('No es un correo valido')
    .required('Es requerido'),
  password: yup
    .string()
    .required('Es requerido')
    .min(8, 'Muy corto')
    .matches(/[a-zA-Z0-9]/, 'No se permite caracteres especiales'), // no esta incluyendo correctame \d, lo interpreta como \\d
};

const schema = yup
  .object(basicSchemConfig)
  .required();

export default schema;