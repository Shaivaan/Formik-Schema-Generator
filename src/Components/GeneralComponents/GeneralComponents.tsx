import { Box, Checkbox, FormControlLabel, InputAdornment, Switch, TextField } from "@mui/material";
import { getNestedValue, setFieldValueFirstArg } from "../../Routes/Utils/HomeUtils";
import { useFormikContext } from "formik";
import { ChangeEvent } from "react";

const ValidationTextFieldMessage = ({messageKey,formikKey}:ValidationTextFieldMessageType)=>{
    const {setFieldValue,values,errors,touched} =  useFormikContext<FormInitType>();
    const placholderLabel = `Enter ${messageKey} Validation Message`;
    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        setFieldValue(formikKey,event.target.value);
    }
    const errorMessage = getNestedValue(formikKey,errors);
    const isError =  getNestedValue(formikKey,touched) && getNestedValue(formikKey,errors);
    return <TextField error={isError} helperText={errorMessage} onChange={handleChange} value={getNestedValue(formikKey,values)} autoComplete="off" placeholder={placholderLabel}  label = {placholderLabel} fullWidth/>
}


const GeneralTextFieldHandler=({formIndex,keyName,label,placholder}:FormIndexType & KeyNameType & LabelPlaceholderType)=>{
    const {values,handleChange,touched,errors} = useFormikContext<FormInitType>();
    const textFieldValue = getNestedValue(setFieldValueFirstArg(formIndex,keyName as fieldKeyType),values);
    const isError = getNestedValue(setFieldValueFirstArg(formIndex,keyName as fieldKeyType),touched) && getNestedValue(setFieldValueFirstArg(formIndex,keyName as fieldKeyType),errors);
    return <TextField error={isError} helperText={getNestedValue(setFieldValueFirstArg(formIndex,keyName as fieldKeyType),errors)} variant="outlined" value={textFieldValue} label={label} placeholder={placholder} autoComplete="off" name={setFieldValueFirstArg(formIndex,keyName  as fieldKeyType)} onChange={handleChange}/>
    
}


const ReusableCheckBox=({label,keyName,formIndex}:ReusableCheckBoxType)=>{
    const {values,setFieldValue} = useFormikContext<FormInitType>();
    const handlePasswordValidator = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(setFieldValueFirstArg(formIndex,keyName as fieldKeyType),event.target.checked);
    };
    return <FormControlLabel
    value="end"
    control={<Checkbox onChange={handlePasswordValidator} checked={ getNestedValue(setFieldValueFirstArg(formIndex,keyName as fieldKeyType),values)}/>}
    label={label}
    labelPlacement="end"
/>
}

const CharLimitValidation=({limit_type,formIndex,keyName}:CharLimitValidationType & FormIndexType)=>{
    const {values,setFieldValue,errors,touched} = useFormikContext<FormInitType>();
    const changeKeyName = limit_type === 'min' ?  'isMinLimit' : 'isMaxLimit';
    const handleLimitDisableEnableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(setFieldValueFirstArg(formIndex,keyName + changeKeyName as fieldKeyType),!event.target.checked);
    };
    const minMaxKey = limit_type  === 'min' ? 'minLimit' : 'maxLimit';
    let minMaxValue = getNestedValue(setFieldValueFirstArg(formIndex,keyName + minMaxKey as fieldKeyType),values);
    const handleMinMaxLimitHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(setFieldValueFirstArg(formIndex,keyName + minMaxKey as fieldKeyType),event.target.value);
    }; 
      
    const isError = getNestedValue(setFieldValueFirstArg(formIndex,keyName + minMaxKey as fieldKeyType),touched) &&  getNestedValue(setFieldValueFirstArg(formIndex,keyName + minMaxKey as fieldKeyType),errors) || getNestedValue(setFieldValueFirstArg(formIndex,keyName + changeKeyName as fieldKeyType),errors)

    return <Box>
        <TextField
            autoComplete="off"
            variant="outlined"
            placeholder={`Enter ${limit_type} Limit`}
            label={`Enter ${limit_type} Limit`}
            fullWidth
            type="number"
            value={minMaxValue}
            error={isError}
            helperText={isError}
            onChange={handleMinMaxLimitHandler}
            disabled = {!getNestedValue(setFieldValueFirstArg(formIndex,keyName + changeKeyName as fieldKeyType),values)}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <FormControlLabel control={<Switch onChange={handleLimitDisableEnableChange} checked = {!getNestedValue(setFieldValueFirstArg(formIndex,keyName + changeKeyName as fieldKeyType),values)} defaultChecked />} label={`No ${limit_type} Limit`} />
                  </InputAdornment>
                )
              }}
        />
    </Box>
}

export {ValidationTextFieldMessage,GeneralTextFieldHandler,ReusableCheckBox,CharLimitValidation}