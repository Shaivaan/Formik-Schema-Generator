const minMaxLimitInitialValue = {
    isMinLimit : true,
    minLimit : '8',
    isMaxLimit : false,
    maxLimit : '10'
}    
const stringSelectedType = ['basic','email','password','url', 'min max'];
const errorMessage = (message:string)=> {return {errorMessage : `Please enter valid ${message}`}};
const basicInitValue = {type:'basic'};
const emailInitValue = {...errorMessage('Email'),type:'email',isCustomEmail:false,customMail:null};
const urlInitValue = {...errorMessage('URL'),type:'url',isCustomUrl:false,customUrl:null};
const minMaxInitValue = {...errorMessage('Limit'),type : 'min max',...minMaxLimitInitialValue};
const passwordInitValue = {
    ...errorMessage('Password'),
     isNumberRequired:true,
     isUpperCaseRequired: true,
     isLowerCaseRequired : true,
     isSpecialCharacterRequired:true,
     type:'password',
     ...minMaxLimitInitialValue
    };
const passwordFormUtils = [
    {label: 'Is Number Required?',keyName : 'isNumberRequired'},
    {label: 'Is Upper Case Char Required?',keyName : 'isUpperCaseRequired'},
    {label: 'Is Lower Case Required?',keyName : 'isLowerCaseRequired'},
    {label: 'Is Special Case Char Required?',keyName : 'isSpecialCharacterRequired'}
]

export {errorMessage,stringSelectedType,passwordFormUtils,basicInitValue,emailInitValue,urlInitValue,minMaxInitValue,passwordInitValue,minMaxLimitInitialValue};