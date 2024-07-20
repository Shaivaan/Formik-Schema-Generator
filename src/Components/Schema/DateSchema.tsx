import * as Yup from 'yup';


const basicSchema = Yup.object().shape({
    inFutureOnly: Yup.bool().test('future-past-check', 'Please select either future or past', function (value) {
        return !(value && this.parent.inPastOnly);
      }),
  });
const dateSchema = () => Yup.lazy((value) => {
    if (!value) return Yup.mixed().nullable();

    switch (value?.type) {
        case 'range':
            return rangeSchema;
        default:
            return basicSchema;
    }
});


const limitSchema = () => {
    return {
      minLimit: Yup.date().test(
        'minLimit',
        'Min limit must be less than max limit',
        function (value) {
          if (this.parent.isMinLimit && this.parent.isMaxLimit) {
            return new Date(value as unknown as number) < new Date(this.parent.maxLimit);
          }
          return true;
        }
      ).required('Min limit is required').nullable(),
      maxLimit: Yup.date().test(
        'maxLimit',
        'Max limit must be greater than min limit',
        function (value) {
          if (this.parent.isMinLimit && this.parent.isMaxLimit) {
            return new Date(value as unknown as number) > new Date(this.parent.minLimit);
          }
          return true;
        }
      ).required('Max limit is required').nullable(),
    };
  };
  
  const rangeSchema = Yup.object().shape({
    type: Yup.string().oneOf(['range']).required(),
    errorMessage: Yup.string().required('Limit Validation Message is required'),
    ...limitSchema(),
    isMinLimit: Yup.bool().test('isMinLimit', 'Please select at least one limit', function (value) {
      return value || this.parent.isMaxLimit;
    }),
    isMaxLimit: Yup.bool(),
    inFutureOnly: Yup.bool().test('future-past-check', 'Please select either future or past', function (value) {
        return !(value && this.parent.inPastOnly);
      }),
  });
  
  export {dateSchema}