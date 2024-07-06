const errorMessage = {
    errorMessage : ''
}

const stringSelectedType = ['basic','email','password','url', 'min max'];
const emailInitValue = {...errorMessage};
const urlInitValue = {...errorMessage};
const minMaxInitValue = {...errorMessage,minLimit:null,maxLimit:null};
const passwordInitValue = {...errorMessage, isNumberRequired:false,isUpperCaseRequired: false,isLowerCaseRequired : false,isSpecialCharacterRequired:false,passwordMinLength:8};
export {stringSelectedType};