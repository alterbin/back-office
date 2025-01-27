import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
  password: Yup.string()
    .test('uppercase', 'Password must contain at least one uppercase letter', (value) => /.*[A-Z].*/.test(value || ''))
    .test('lowercase', 'Password must contain at least one lowercase letter', (value) => /.*[a-z].*/.test(value || ''))
    .test('specialCharacter', 'Password must contain at least one special character', (value) => /.*[^\w\s].*/.test(value || ''))
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
