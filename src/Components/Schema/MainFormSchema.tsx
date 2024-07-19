import * as Yup from 'yup';
import { stringSchema } from './StringSchema';
import { numberSchema } from './NumberSchema';


const mainFormSchema = () => {
    return Yup.object().shape({
        formInitialValues: Yup.array().of(
            Yup.object().shape({
                keyName: Yup.string().required('Key name is required'),
                isRequired: Yup.boolean(),
                isNullable: Yup.boolean(),
                requireMessage: Yup.string().required('Require message is required'),
                type: Yup.string().required('Type is required'),
                whenSelectedString: stringSchema(),
                whenSelectedNumber: numberSchema(),
            })
        ),
    });
};

export {mainFormSchema}