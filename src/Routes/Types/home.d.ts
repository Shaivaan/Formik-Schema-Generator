interface EachKeyForm{
    formIndex:number
}

type fieldKeyType = keyof EachFormInitialValueType

interface ReusableCheckBoxType{
    label:string
    keyName:string
    formIndex:number
}

interface EachFormInitialValueType{
    isRequired:boolean
    isNullable:boolean
    type : string
    whenSelectedString : null    
    requireMessage:string
}

interface FormInitType{
    formInitialValues : EachFormInitialValueType[]
}

interface ValidationTextFieldMessageType{
    messageKey : string,
    formikKey:string
}

type CategoryHandlerType = 'string' | 'number'
interface CategoryHandlerCompType{
    type : CategoryHandlerType,
}

interface FormIndexType { 
    formIndex:number
}
