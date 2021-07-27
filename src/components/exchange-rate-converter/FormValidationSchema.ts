import * as Yup from "yup";

export default Yup.object().shape({
    toCurrency: Yup.string().required('Invalid currency').matches(/^[a-zA-Z]{3}$/, 'Invalid currency'),
    fromCurrency: Yup.string().required('Invalid currency').matches(/^[a-zA-Z]{3}$/, 'Invalid currency'),
});