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
    keyName: null | string
    isRequired:boolean
    isNullable:boolean
    type : string
    whenSelectedString : null    
    whenSelectedNumber: null
    requireMessage:string
}

interface FormInitType{
    formInitialValues : EachFormInitialValueType[]
}

interface ValidationTextFieldMessageType{
    messageKey : string,
    formikKey:string
}

type CategoryHandlerType = 'string' | 'number' | string
interface CategoryHandlerCompType{
    type : CategoryHandlerType,
}

interface FormIndexType { 
    formIndex:number
}

interface KeyNameType{
    keyName:string
}

interface LabelPlaceholderType{
    label:string
    placholder : string
}