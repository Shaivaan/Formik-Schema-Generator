const eachKeyForm = {
    isRequired:false,
    isNullable:false,
    type : '',
    whenSelectedString : null
}

const errorMessage = {
    errorMessage : ''
}

const formInitialValues = {formInitialValues : [{...eachKeyForm}]};
const typeValue = ['string','number'];
const stringSelectedType = ['basic','email','password','url', 'min max'];

// String Form InitialValues
const emailInitValue = {...errorMessage};
const urlInitValue = {...errorMessage};
const minMaxInitValue = {...errorMessage,minLimit:null,maxLimit:null};
const passwordInitValue = {...errorMessage, isNumberRequired:false,isUpperCaseRequired: false,isLowerCaseRequired : false,isSpecialCharacterRequired:false,passwordMinLength:8};









export {formInitialValues,typeValue,stringSelectedType}