interface EachKeyForm{
    formIndex:number
}

interface ReusableCheckBoxType{
    label:string
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