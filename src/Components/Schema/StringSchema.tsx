import * as Yup from 'yup';

const stringSchema = () => Yup.lazy((value) => {
    if (!value) return Yup.mixed().nullable();

    switch (value.type) {
        case 'email':
            return emailSchema;
        case 'password':
            return passwordSchema;
        case 'url':
            return urlSchema;
        case 'min max':
            return minMaxSchema;
        default:
        return basicSchema;
    }
})


const basicSchema = Yup.object().shape({
    type: Yup.string().oneOf(['basic']).required(),
});


 
const emailSchema =  Yup.object().shape({
    type: Yup.string().oneOf(['email']).required(),
    errorMessage: Yup.string().required('Email error message is required'),
    customMail: Yup.string().nullable()
      .test(
        'is-custom-email',
        'Email must end with the specified domain',
        function (value) {
          const { isCustomEmail, customMail } = this.parent;
          if (isCustomEmail) {
            return value ? value.endsWith(customMail) : false;
          }
          return true;
        }
      )
      .matches(
        /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid domain'
      ),
  });


const limitSchema = () => {
  return {
    minLimit: Yup.number().test(
      'minLimit',
      'Min limit must be less than max limit',
      function (value) {
        return (this.parent.isMinLimit && this.parent.isMaxLimit) ? (value as number) < this.parent.maxLimit : true;
      }
    ),
    maxLimit: Yup.number().test(
      'maxLimit',
      'Max limit must be greater than min limit',
      function (value) {
        return (this.parent.isMinLimit && this.parent.isMaxLimit) ? (value as number) > this.parent.minLimit : true;
      }
    ),
  };
};

const minMaxSchema = Yup.object().shape({
  type: Yup.string().oneOf(['min max','range']).required(),
  errorMessage: Yup.string().required('Limit Validation Message is required'),
  ...limitSchema(),
  isMinLimit: Yup.bool().test('isMinLimit', 'Please select at least one limit', function (value) {
    return value || this.parent.isMaxLimit;
  }),
  isMaxLimit: Yup.bool(),
});

const passwordSchema = Yup.object().shape({
    type: Yup.string().oneOf(['password']).required(),
    errorMessage: Yup.string().required('Password error message is required'),
    ...limitSchema()
  });

export const validateMinMax = (key: string, value: number, parent: any) => {
    const isMin = key === 'minLimit';
    const limit = isMin ? 'maxLimit' : 'minLimit';
    return !parent[`is${key}`] || !parent[limit] || value < parent[limit];
  };

  const urlSchema = Yup.object().shape({
    type: Yup.string().oneOf(['url']).required(),
    errorMessage: Yup.string().required('URL error message is required'),
    customUrl: Yup.string().nullable()
      .test(
        'is-custom-url',
        'URL must end with the specified domain',
        function (value) {
          const { isCustomUrl, customUrl } = this.parent;
          if (isCustomUrl) {
            return value ? value.endsWith(customUrl) : false;
          }
          return true;
        }
      )
      .matches(
        /^(?!.*\s)(?!.*\d)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        'Custom URL must be a valid domain name'
      ),
  });


export {stringSchema,minMaxSchema}