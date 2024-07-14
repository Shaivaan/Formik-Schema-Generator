import * as Yup from 'yup';
const eachKeyForm = {
    keyName:null,
    isRequired:false,
    isNullable:false,
    type : '',
    whenSelectedString : null,
    requireMessage: 'This Field is Required*',
}


const formInitialValues = {formInitialValues : [{...eachKeyForm}]};
const typeValue = ['string','number'];
const setFieldValueFirstArg = (formIndex:number,fieldKey:fieldKeyType)=> `formInitialValues[${formIndex}].${fieldKey}`;

const createSchemaStringFromValues = (values: EachFormInitialValueType[]): string => {
    const schemaLines: string[] = [];

    values.forEach(({ keyName, isRequired, isNullable, requireMessage }) => {
        let fieldSchema = 'Yup.string()';

        if (isNullable) {
            fieldSchema += `.nullable()`;
        }
        if (isRequired) {
            fieldSchema += `.required('${requireMessage}')`;
        }

        schemaLines.push(`    ${keyName}: ${fieldSchema},`);
    });

    const schemaString = `
Yup.object({
${schemaLines.join('\n')}
})
`;

    return schemaString;
};


export {formInitialValues,typeValue,setFieldValueFirstArg,eachKeyForm,createSchemaStringFromValues}