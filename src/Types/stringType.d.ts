interface StringCategoryComponentsHandlerType{
    stringType:string
}

interface CharLimitValidationType{
    limit_type : 'min' | 'max'
    keyName:string
}


interface MinMaxLimitReusableCompType{
    keyName:string
}


interface MinMaxLimitType{
    minLimit : number
    maxLimit : number
    isMinLimit : boolean
    isMaxLimit : boolean
}

interface ErorMessageAndType{
    type : string
    errorMessage : string
}

interface EmailType  {
    errorMessage: string
    type: string
    isCustomEmail: boolean
    customMail: string
  };

interface PasswordMessageAndType extends ErorMessageAndType{
        isNumberRequired: boolean,
        isUpperCaseRequired: boolean,
        isLowerCaseRequired: boolean,
        isSpecialCharacterRequired: boolean,
        isMinLimit: boolean,
        minLimit: number,
        isMaxLimit: boolean,
        maxLimit: number
}