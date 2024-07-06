const eachKeyForm = {
    isRequired:false,
    isNullable:false,
    type : '',
    whenSelectedString : null,
    requireMessage: 'This Field is Required*',
}


const formInitialValues = {formInitialValues : [{...eachKeyForm}]};
const typeValue = ['string','number'];
const setFieldValueFirstArg = (formIndex:number,fieldKey:keyof EachFormInitialValueType)=> `formInitialValues[${formIndex}].${fieldKey}`

export {formInitialValues,typeValue,setFieldValueFirstArg}