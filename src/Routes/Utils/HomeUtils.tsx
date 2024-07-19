import { FormikErrors, FormikTouched } from "formik";

const eachKeyForm = {
  keyName: null,
  isRequired: false,
  isNullable: false,
  type: "",
  whenSelectedString: null,
  whenSelectedNumber:null,
  whenSelectedDate: null,
  requireMessage: "This Field is Required*",
};

const formInitialValues = { formInitialValues: [{ ...eachKeyForm }] };
const typeValue = ["string", "number","date"];
const setFieldValueFirstArg = (formIndex: number, fieldKey: fieldKeyType) =>
  `formInitialValues[${formIndex}].${fieldKey}`;


const getNestedValue = (keyName:string,values:FormInitType | FormikErrors<FormInitType> | FormikTouched<FormInitType>) => {
  return keyName.split(/[\.\[\]]+/).filter(Boolean).reduce((acc:any, part) => acc && acc[part], values);
};

const createSchemaStringFromValues = (
  values: EachFormInitialValueType[]
): string => {
  const schemaLines: string[] = [];

  values.forEach(
    ({
      keyName,
      isRequired,
      isNullable,
      type,
      whenSelectedString,
      requireMessage,
      whenSelectedNumber
    }) => {
      
      let fieldSchema = "Yup.string()";
      if (type === "string") {
        switch((whenSelectedString as unknown as ErorMessageAndType).type){
            case "email": 
            fieldSchema = emailSchemaHandler(whenSelectedString as unknown as ErorMessageAndType);    
            break;

            case "password": 
            fieldSchema += passwordSchemaHandler(whenSelectedString as unknown as PasswordMessageAndType);    
            break;

            case "url": 
            fieldSchema = urlSchemaHandler(whenSelectedString as unknown as ErorMessageAndType);
            break;

            case "min max": 
            fieldSchema += minMaxSchemaHandler(whenSelectedString as unknown as PasswordMessageAndType);
            break;

            default:
            break;
        }
      }else if (type === "number") {
        fieldSchema = "Yup.number()";
        
        
        if ((whenSelectedNumber as unknown as WhenSelectedNumberType)?.isNonZero) {
          fieldSchema += `.moreThan(0, 'Must be greater than zero')`;
        }
        if ((whenSelectedNumber as unknown as WhenSelectedNumberType)?.isInteger) {
          fieldSchema += `.integer('Must be an integer')`;
        }
        if ((whenSelectedNumber as unknown as WhenSelectedNumberType)?.isPositiveOnly) {
          fieldSchema += `.positive('Must be a positive number')`;
        }
        switch ((whenSelectedNumber as unknown as WhenSelectedNumberType)?.type) {
          case 'multiple':
            fieldSchema += `.test('is-multiple', '${(whenSelectedNumber as unknown as MultipleType).errorMessage}', value => value % ${(whenSelectedNumber as unknown as MultipleType).multiple} === 0)`;
            break;
          case 'count':
            fieldSchema += `.test('is-digit-count', '${(whenSelectedNumber as unknown as CountType).errorMessage}', value => value && value.toString().length === ${(whenSelectedNumber as unknown as CountType).count})`;
            break;
          case 'range':
            if ((whenSelectedNumber as unknown as MinMaxTypeNumber).isMinLimit) {
              fieldSchema += `.min(${(whenSelectedNumber as unknown as MinMaxTypeNumber).minLimit}, 'Minimum limit is ${(whenSelectedNumber as unknown as MinMaxTypeNumber).minLimit}')`;
            }
            if ((whenSelectedNumber as unknown as MinMaxTypeNumber).isMaxLimit) {
              fieldSchema += `.max(${(whenSelectedNumber as unknown as MinMaxTypeNumber).maxLimit}, 'Maximum limit is ${(whenSelectedNumber as unknown as MinMaxTypeNumber).maxLimit}')`;
            }
            break;
          default:
            break;
        }

      }
      if (isNullable) {
        fieldSchema += `.nullable()`;
      }

      if (isRequired) {
        fieldSchema += `.required('${requireMessage}')`;
      }

      schemaLines.push(`${keyName}: ${fieldSchema},`);
    }
  );

  const schemaString = `
Yup.object().shape({
${schemaLines.join("\n")}
});
`;

  return schemaString;
};


const emailSchemaHandler = (whenSelectedString:ErorMessageAndType)=>{
     return `Yup.string().email('${
        (whenSelectedString).errorMessage
      }')`;
}

const passwordSchemaHandler = (whenSelectedString:PasswordMessageAndType)=>{
    let fieldSchema = '';
    const passwordDetails = whenSelectedString as PasswordMessageAndType;
    if (passwordDetails.isMinLimit) {
      fieldSchema += `.min(${Number(
        passwordDetails.minLimit
      )}, 'Password must be at least ${
        passwordDetails.minLimit
      } characters long')`;
    }
    if (passwordDetails.isMaxLimit) {
      fieldSchema += `.max(${Number(
        passwordDetails.maxLimit
      )}, 'Password must be at most ${
        passwordDetails.maxLimit
      } characters long')`;
    }
    if (passwordDetails.isNumberRequired) {
      fieldSchema += `.matches(/\\d/, 'Password must contain at least one number')`;
    }
    if (passwordDetails.isUpperCaseRequired) {
      fieldSchema += `.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')`;
    }
    if (passwordDetails.isLowerCaseRequired) {
      fieldSchema += `.matches(/[a-z]/, 'Password must contain at least one lowercase letter')`;
    }
    if (passwordDetails.isSpecialCharacterRequired) {
      fieldSchema += `.matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')`;
    }
    return fieldSchema
}

const urlSchemaHandler = (whenSelectedString: ErorMessageAndType): string => {
    return `Yup.string().url('${whenSelectedString.errorMessage}')`;
  };

  const minMaxSchemaHandler=(whenSelectedString:PasswordMessageAndType)=>{
    let fieldSchema = "";
    const passwordDetails = whenSelectedString as PasswordMessageAndType;
    if (passwordDetails.isMinLimit) {
        fieldSchema += `.min(${Number(
          passwordDetails.minLimit
        )}, 'Password must be at least ${
          passwordDetails.minLimit
        } characters long')`;
      }
      if (passwordDetails.isMaxLimit) {
        fieldSchema += `.max(${Number(
          passwordDetails.maxLimit
        )}, 'Password must be at most ${
          passwordDetails.maxLimit
        } characters long')`;
      }
      return fieldSchema;
  }


export {
  formInitialValues,
  typeValue,
  setFieldValueFirstArg,
  eachKeyForm,
  createSchemaStringFromValues,
  getNestedValue
};
