import { FormikErrors, FormikTouched } from "formik";

const eachKeyForm = {
  keyName: null,
  isRequired: false,
  isNullable: false,
  type: "",
  whenSelectedString: null,
  whenSelectedNumber:null,
  whenSelectedDate: null,
  whenSelectedFile:null,
  requireMessage: "This Field is Required*",
};

const formInitialValues = { formInitialValues: [{ ...eachKeyForm }] };
const typeValue = ["string", "number","date","file"];
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
      whenSelectedNumber,
      whenSelectedDate,
      whenSelectedFile
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
      else if(type === 'date'){
        fieldSchema = "Yup.date()";
        if ((whenSelectedDate as unknown as WhenSelectedDateType)?.inFutureOnly) {
          fieldSchema += `.min(new Date(), 'Date must be in the future')`;
        } else if ((whenSelectedDate as unknown as WhenSelectedDateType)?.inPastOnly) {
          fieldSchema += `.max(new Date(), 'Date must be in the past')`;
        }

        switch ((whenSelectedDate as unknown as WhenSelectedDateType)?.type) {
          case 'range':
            if ((whenSelectedDate as unknown as MinMaxTypeDate).isMinLimit) {
              fieldSchema += `.min(new Date('${(whenSelectedDate as unknown as MinMaxTypeDate).minLimit}'), 'Minimum date is ${(whenSelectedDate as unknown as MinMaxTypeDate).minLimit}')`;
            }
            if ((whenSelectedDate as unknown as MinMaxTypeDate).isMaxLimit) {
              fieldSchema += `.max(new Date('${(whenSelectedDate as unknown as MinMaxTypeDate).maxLimit}'), 'Maximum date is ${(whenSelectedDate as unknown as MinMaxTypeDate).maxLimit}')`;
            }
            break;
          default:
            break;
        }

      }else if (type === 'file') {
        let fileSchema = 'Yup.mixed()';
      
        if ((whenSelectedFile as unknown as WhenSelectedFileType)?.isFileSizeValidate) {
          if ((whenSelectedFile as unknown as WhenSelectedFileType)?.type === 'single') {
            fileSchema += `.test('fileSize', '${(whenSelectedFile as unknown as WhenSelectedFileType)?.fileSizeErrorMessage}', value => value && value.size <= ${(whenSelectedFile as unknown as WhenSelectedFileType)?.fileSize} * 1024)`;
          } else if ((whenSelectedFile as unknown as WhenSelectedFileType)?.type === 'multiple') {
            fileSchema += `.test('fileSize', '${(whenSelectedFile as unknown as WhenSelectedFileType)?.fileSizeErrorMessage}', value => Array.isArray(value) && value.every(file => file.size <= ${(whenSelectedFile as unknown as WhenSelectedFileType)?.fileSize} * 1024))`;
          }
        }
      
        if ((whenSelectedFile as unknown as WhenSelectedFileType)?.isFileType && (whenSelectedFile as unknown as WhenSelectedFileType)?.allowedFile) {
          const allowedExtensions = (whenSelectedFile as unknown as WhenSelectedFileType).allowedFile.map(ext => `'${ext}'`).join(', ');
          if ((whenSelectedFile as unknown as WhenSelectedFileType)?.type === 'single') {
            fileSchema += `.test('fileType', '${(whenSelectedFile as unknown as WhenSelectedFileType)?.fileTypeErrorMessage}', value => value && [${allowedExtensions}].includes(value.name.split('.').pop()?.toLowerCase() || ''))`;
          } else if ((whenSelectedFile as unknown as WhenSelectedFileType)?.type === 'multiple') {
            fileSchema += `.test('fileType', '${(whenSelectedFile as unknown as WhenSelectedFileType)?.fileTypeErrorMessage}', value => Array.isArray(value) && value.every(file => [${allowedExtensions}].includes(file.name.split('.').pop()?.toLowerCase() || ''))`;
          }
        }
      
        fieldSchema = fileSchema;
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
