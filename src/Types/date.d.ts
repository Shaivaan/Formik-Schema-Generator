type WhenSelectedDateType = {
    type: 'range';
    minLimit: string;
    maxLimit: string;
    isMinLimit: boolean;
    isMaxLimit: boolean;
    inFutureOnly: boolean;
    inPastOnly: boolean;
  };

interface MinMaxTypeDate{
    isMinLimit:boolean
    isMaxLimit:boolean
    minLimit:Date
    maxLimit:Date
}