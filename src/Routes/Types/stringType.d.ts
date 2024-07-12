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