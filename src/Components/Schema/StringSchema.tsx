import * as Yup from 'yup';

const stringSchema = () => Yup.lazy((value) => {
    if (!value) return Yup.mixed().nullable();

    switch (value.type) {
        case 'email':
            return emailSchema;
        case 'password':
            return passwordSchema;
        case 'url':
            return Yup.object().shape({
                type: Yup.string().oneOf(['url']).required(),
                errorMessage: Yup.string().required('URL error message is required'),
            });
        case 'min max':
            return Yup.object().shape({
                type: Yup.string().oneOf(['min max']).required(),
                min: Yup.number().required('Min is required'),
                max: Yup.number().required('Max is required'),
            });
        default:
            return Yup.object().shape({
                type: Yup.string().oneOf(['basic']).required(),
            });
    }
})


const emailSchema = Yup.object().shape({
    type: Yup.string().oneOf(['email']).required(),
    errorMessage: Yup.string().required('Email error message is required'),
})


const passwordSchema = Yup.object().shape({
    type: Yup.string().oneOf(['password']).required(),
    errorMessage: Yup.string().required('Password error message is required'),   
    
})




export {stringSchema}