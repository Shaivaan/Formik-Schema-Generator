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

const createStringSchema = (
  whenSelectedString: ErorMessageAndType | PasswordMessageAndType | null,
  isNullable: boolean,
  isRequired: boolean,
  requireMessage: string
): string => {
  let fieldSchema = "Yup.string()";

  if (whenSelectedString) {
    switch (whenSelectedString.type) {
      case "email":
        fieldSchema = emailSchemaHandler(whenSelectedString as ErorMessageAndType);
        break;
      case "password":
        fieldSchema += passwordSchemaHandler(whenSelectedString as PasswordMessageAndType);
        break;
      case "url":
        fieldSchema = urlSchemaHandler(whenSelectedString as ErorMessageAndType);
        break;
      case "min max":
        fieldSchema += minMaxSchemaHandler(whenSelectedString as PasswordMessageAndType);
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

  return fieldSchema;
};

const createNumberSchema = (
  whenSelectedNumber: WhenSelectedNumberType | null,
  isNullable: boolean,
  isRequired: boolean,
  requireMessage: string
): string => {
  let fieldSchema = "Yup.number()";

  if (whenSelectedNumber) {
    if (whenSelectedNumber.isNonZero) {
      fieldSchema += `.moreThan(0, 'Must be greater than zero')`;
    }
    if (whenSelectedNumber.isInteger) {
      fieldSchema += `.integer('Must be an integer')`;
    }
    if (whenSelectedNumber.isPositiveOnly) {
      fieldSchema += `.positive('Must be a positive number')`;
    }
    switch (whenSelectedNumber.type) {
      case 'multiple':
        fieldSchema += `.test('is-multiple', '${whenSelectedNumber.errorMessage}', value => value % ${whenSelectedNumber.multiple} === 0)`;
        break;
      case 'count':
        fieldSchema += `.test('is-digit-count', '${whenSelectedNumber.errorMessage}', value => value && value.toString().length === ${whenSelectedNumber.count})`;
        break;
      case 'range':
        if (whenSelectedNumber.isMinLimit) {
          fieldSchema += `.min(${whenSelectedNumber.minLimit}, 'Minimum limit is ${whenSelectedNumber.minLimit}')`;
        }
        if (whenSelectedNumber.isMaxLimit) {
          fieldSchema += `.max(${whenSelectedNumber.maxLimit}, 'Maximum limit is ${whenSelectedNumber.maxLimit}')`;
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

  return fieldSchema;
};

const createDateSchema = (
  whenSelectedDate: WhenSelectedDateType | null,
  isNullable: boolean,
  isRequired: boolean,
  requireMessage: string
): string => {
  let fieldSchema = "Yup.date()";

  if (whenSelectedDate) {
    if (whenSelectedDate.inFutureOnly) {
      fieldSchema += `.min(new Date(), 'Date must be in the future')`;
    } else if (whenSelectedDate.inPastOnly) {
      fieldSchema += `.max(new Date(), 'Date must be in the past')`;
    }

    if (whenSelectedDate.type === 'range') {
      if (whenSelectedDate.isMinLimit) {
        fieldSchema += `.min(new Date('${whenSelectedDate.minLimit}'), 'Minimum date is ${whenSelectedDate.minLimit}')`;
      }
      if (whenSelectedDate.isMaxLimit) {
        fieldSchema += `.max(new Date('${whenSelectedDate.maxLimit}'), 'Maximum date is ${whenSelectedDate.maxLimit}')`;
      }
    }
  }

  if (isNullable) {
    fieldSchema += `.nullable()`;
  }

  if (isRequired) {
    fieldSchema += `.required('${requireMessage}')`;
  }

  return fieldSchema;
};

const createFileSchema = (
  whenSelectedFile: WhenSelectedFileType | null,
  isNullable: boolean,
  isRequired: boolean,
  requireMessage: string
): string => {
  let fileSchema = 'Yup.mixed()';

  if (whenSelectedFile) {
    if (whenSelectedFile.isFileSizeValidate) {
      if (whenSelectedFile.type === 'single') {
        fileSchema += `.test('fileSize', '${whenSelectedFile.fileSizeErrorMessage}', value => value && value.size <= ${whenSelectedFile.fileSize} * 1024)`;
      } else if (whenSelectedFile.type === 'multiple') {
        fileSchema += `.test('fileSize', '${whenSelectedFile.fileSizeErrorMessage}', value => Array.isArray(value) && value.every(file => file.size <= ${whenSelectedFile.fileSize} * 1024))`;
      }
    }

    if (whenSelectedFile.isFileType && whenSelectedFile.allowedFile) {
      const allowedExtensions = whenSelectedFile.allowedFile.map(ext => `'${ext}'`).join(', ');
      if (whenSelectedFile.type === 'single') {
        fileSchema += `.test('fileType', '${whenSelectedFile.fileTypeErrorMessage}', value => value && [${allowedExtensions}].includes(value.name.split('.').pop()?.toLowerCase() || ''))`;
      } else if (whenSelectedFile.type === 'multiple') {
        fileSchema += `.test('fileType', '${whenSelectedFile.fileTypeErrorMessage}', value => Array.isArray(value) && value.every(file => [${allowedExtensions}].includes(file.name.split('.').pop()?.toLowerCase() || ''))`;
      }
    }
  }

  if (isNullable) {
    fileSchema += `.nullable()`;
  }

  if (isRequired) {
    fileSchema += `.required('${requireMessage}')`;
  }

  return fileSchema;
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
      let fieldSchema: string;

      switch (type) {
        case "string":
          fieldSchema = createStringSchema(whenSelectedString as ErorMessageAndType | PasswordMessageAndType | null, isNullable, isRequired, requireMessage);
          break;
        case "number":
          fieldSchema = createNumberSchema(whenSelectedNumber as WhenSelectedNumberType | null, isNullable, isRequired, requireMessage);
          break;
        case "date":
          fieldSchema = createDateSchema(whenSelectedDate as WhenSelectedDateType | null, isNullable, isRequired, requireMessage);
          break;
        case "file":
          fieldSchema = createFileSchema(whenSelectedFile as WhenSelectedFileType | null, isNullable, isRequired, requireMessage);
          break;
        default:
          fieldSchema = "Yup.mixed()";
          break;
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
