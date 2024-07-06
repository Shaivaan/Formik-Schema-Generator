const stringSelectedType = ['basic','email','password','url', 'min max'];
const errorMessage = {
    errorMessage : ''
}
const basicInitValue = {type:'basic'};
const emailInitValue = {...errorMessage,type:'email'};
const urlInitValue = {...errorMessage,type:'url'};
const minMaxInitValue = {...errorMessage,minLimit:null,maxLimit:null,type : 'min max'};
const passwordInitValue = {...errorMessage, isNumberRequired:false,isUpperCaseRequired: false,isLowerCaseRequired : false,isSpecialCharacterRequired:false,passwordMinLength:8,type:'password'};

const passwordFormUtils = [
    {label: 'Is Number Required?',keyName : 'isNumberRequired'},
    {label: 'Is Upper Case Char Required?',keyName : 'isUpperCaseRequired'},
    {label: 'Is Lower Case Required?',keyName : 'isLowerCaseRequired'},
    {label: 'Is Special Case Char Required?',keyName : 'isSpecialCharacterRequired'}
]

export {stringSelectedType,passwordFormUtils,basicInitValue,emailInitValue,urlInitValue,minMaxInitValue,passwordInitValue};