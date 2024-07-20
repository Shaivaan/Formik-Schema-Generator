import { errorMessage } from "./StringCategoryUtils";
const today = new Date();
const four_day_later_js = new Date(today);
const four_day_later = new Date(four_day_later_js.setDate(today.getDate() + 4)) 
const date_utils = {inFutureOnly:false,inPastOnly:false};
const minMaxLimitInitialValue = {
    isMinLimit : true,
    minLimit : today,
    isMaxLimit : false,
    maxLimit : four_day_later
}   
const basic_date_type = {type : 'basic'};
const range_date_type = {type: 'range',...errorMessage('date range*'),...minMaxLimitInitialValue};
const date_option_type = ['basic','range'];
const date_util_arry = [
    {label:'In Future Only',keyName : 'inFutureOnly'},
    {label:'In Past Only',keyName : 'inPastOnly'},
]
export {date_utils,basic_date_type,range_date_type,minMaxLimitInitialValue,date_util_arry,date_option_type};