interface WhenSelectedDateType{
    inFutureOnly:boolean
    inPastOnly :boolean
    type:string
}

interface MinMaxTypeDate{
    isMinLimit:boolean
    isMaxLimit:boolean
    minLimit:Date
    maxLimit:Date
}