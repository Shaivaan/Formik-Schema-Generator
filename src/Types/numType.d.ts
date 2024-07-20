type WhenSelectedNumberType = {
    type: 'multiple' | 'count' | 'range';
    errorMessage?: string;
    multiple?: number;
    count?: number;
    minLimit?: number;
    maxLimit?: number;
    isMinLimit?: boolean;
    isMaxLimit?: boolean;
    isNonZero?: boolean;
    isInteger?: boolean;
    isPositiveOnly?: boolean;
  };

interface CountType{
    count:string
    errorMessage:string
}

interface MultipleType{
    multiple:string
    errorMessage:string
}

type MinMaxTypeNumber = MinMaxLimitType & {errorMessage:string}