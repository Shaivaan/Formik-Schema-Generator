interface WhenSelectedNumberType{
    isNonZero:boolean
    isInteger:boolean
    isPositiveOnly:boolean
    type:string
}

interface CountType{
    count:string
    errorMessage:string
}

interface MultipleType{
    multiple:string
    errorMessage:string
}

type MinMaxTypeNumber = MinMaxLimitType & {errorMessage:string}