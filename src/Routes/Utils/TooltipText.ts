const requiredText = 'Make this field mandatory.';
const isNullableText = 'Allow the field to accept null values.';
const stringCategoryText = [
    'Basic string',
    'Expect this field to a valid email',
    'Expect this field to a valid password with below options',
    'Expect this field to a valid url',
    'This will help string to maintain in a range'
];


const numCategoryText = [
    'Basic Number',
    'This will help string to maintain in a range(eg:Cell Number)',
    'Expect as number if digit count provided(eg:CVV)',
    'Expect a number that should be multiple of provided number(eg:Table)'
];

const dateCategoryText = [
    'Basic Date',
    'Help to select date for a period'
];

const fileCategoryText = [
    'Expect single file',
    'Expect an array of file',
];


export {requiredText,isNullableText,stringCategoryText,numCategoryText,dateCategoryText,fileCategoryText}