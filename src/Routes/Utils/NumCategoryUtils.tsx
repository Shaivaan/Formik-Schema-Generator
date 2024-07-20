import { errorMessage, minMaxLimitInitialValue } from "./StringCategoryUtils";

const gen_num_option = {isNonZero:false,isInteger:false,isPositiveOnly:false};
const num_basic_type = {type:'basic'};
const num_range_type = {type:'range',...minMaxLimitInitialValue,...errorMessage('range*')};
const num_digit_type = {type:'count',count:3,...errorMessage('digit count*')};
const num_multiple_type = {type:'multiple',multiple:5,...errorMessage('number*')};
const num_selected_type = ['basic','range','count','multiple'];
const gen_num_array = [
    {label:'Non-Zero',keyName : 'isNonZero'},
    {label:'Integer',keyName : 'isInteger'},
    {label:'Positive Only',keyName : 'isPositiveOnly'}
]


export {gen_num_array, gen_num_option,num_basic_type,num_range_type,num_digit_type,num_multiple_type,num_selected_type}