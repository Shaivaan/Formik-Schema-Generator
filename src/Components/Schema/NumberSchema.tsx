import * as Yup from 'yup';
import { minMaxSchema } from './StringSchema';



const basicNumberSchema = Yup.number();

const numberSchema = () => Yup.lazy((value) => {
    if (!value) return Yup.mixed().nullable();

    switch (value?.type) {
        case 'multiple':
            return multipleSchema;
        case 'range':
            return minMaxSchema;
        case 'count':
            return countSchema;
        default:
            return basicNumberSchema;
    }
});


const multipleSchema = Yup.object().shape({
    multiple: Yup.number()
        .typeError('Multiple must be a number')
        .required('This Field is Required*'),
    errorMessage: Yup.string()
        .required('Error message is required')
});

const countSchema = Yup.object().shape({
    count: Yup.number()
        .typeError('Count must be a number')
        .positive('Count must be a positive number')
        .integer('Count must be an integer')
        .required('This Field is Required*'),
    errorMessage: Yup.string()
        .required('Error message is required')
});


export {numberSchema}