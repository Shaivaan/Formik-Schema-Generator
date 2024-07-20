import { errorMessage } from "./StringCategoryUtils";

const file_single = {type : 'single'};
const file_multiple = {type : 'multiple'};
const file_util = {
    isFileSizeValidate:false,
    fileSize:5000,
    isFileType:false,
    allowedFile:[],
    fileSizeErrorMessage : errorMessage('file size'),
    fileTypeErrorMessage : errorMessage('file type')
}
const file_util_arry = [
    {label:'Maximum File Size',keyName : 'isFileSizeValidate'},
    {label:'Specific File Types',keyName : 'isFileType'}
]
const file_category = ['single','multiple'];
export {file_multiple,file_single,file_util,file_util_arry,file_category}