import { Box, FormControlLabel, Grid, InputAdornment, Radio, RadioGroup, Switch, TextField, TextFieldProps } from "@mui/material";
import { basic_date_type, date_option_type, date_util_arry, range_date_type } from "../../Routes/Utils/DateUtils";
import { ReusableCheckBox } from "../GeneralComponents/GeneralComponents";
import { useFormikContext } from "formik";
import { getNestedValue, setFieldValueFirstArg } from "../../Routes/Utils/HomeUtils";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { forwardRef } from "react";


const DateCategory = ({formIndex}: FormIndexType)=>{
    const {values} = useFormikContext<FormInitType>();
    return <>
        <Grid container spacing={2}>  
            <Grid sm={12} xs={12} item md={6}><DateOptions formIndex={formIndex}/></Grid>
            <Grid sm={12} xs={12} item md={6}><DateUtils formIndex={formIndex}/></Grid>
        </Grid>
        <DateCategoryHandler formIndex={formIndex} type={getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedDate.type' as fieldKeyType),values)}/>
    </>
}

const DateCategoryHandler=({formIndex,type} : CategoryHandlerCompType & FormIndexType)=>{
    switch(type) {
        case 'range': 
        return <DateRangeComponent formIndex={formIndex} keyName="whenSelectedDate."/>
        default : 
        return <></>;
    }
}

const DateUtils=({formIndex}: FormIndexType)=>{
    return  <TextField
    variant="outlined"
    InputLabelProps={{
        shrink: true
    }}
    fullWidth
    className="textfield_parent"            
    label='Select Date Options'
    size="medium"
    InputProps={{
        inputComponent: () => <RadioGroup
            sx={{width:'100%',display:'flex',justifyContent:'space-around'}}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            row
        >
        {date_util_arry.map(({keyName,label},index:number)=><Grid key={index} item ><ReusableCheckBox
        formIndex={formIndex}
        label={label} 
        keyName={`whenSelectedDate.${keyName}` as fieldKeyType}
        /></Grid> )}
        </RadioGroup>
    }}
/>
}

const DateOptions=({formIndex}:FormIndexType )=>{


    const {values,setFieldValue} = useFormikContext<FormInitType>();
      const gen_date_utils = {
        inFutureOnly : getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedDate.inFutureOnly' as fieldKeyType),values),
        inPastOnly : getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedDate.inPastOnly' as fieldKeyType),values),
      }
       
      const handleNumberCategoryChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const numberType = (event.target as HTMLInputElement).value;
        switch(numberType){
            case "basic":
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedDate'),{...basic_date_type,...gen_date_utils});  
                break;
            case "range":
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedDate'),{...range_date_type,...gen_date_utils});  
                break;    
        }
      }

    return <TextField
    variant="outlined"
    InputLabelProps={{
        shrink: true
    }}
    fullWidth
    className="textfield_parent"            
    label='Select Date Type'
    size="medium"
    InputProps={{
        inputComponent: () => <RadioGroup
            sx={{width:'100%',display:'flex',justifyContent:'space-around'}}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedDate.type' as fieldKeyType),values)}
            onChange={handleNumberCategoryChange}
            row
        >
        {date_option_type.map((numType,index) => <FormControlLabel key={index} className="menuItem" control={<Radio size="medium" />} 
        label={numType}  value={numType}
         />)}
        </RadioGroup>
    }}
/>
}


const DateRangeComponent=({formIndex,keyName}:FormIndexType & MinMaxLimitReusableCompType)=>{
    return <Grid container spacing={2}>
        <Grid item sm={6}><CharLimitValidation limit_type="min" formIndex={formIndex} keyName={keyName}/></Grid>
        <Grid item sm={6}><CharLimitValidation limit_type="max" formIndex={formIndex} keyName={keyName}/></Grid>  
    </Grid>
}

const CharLimitValidation=({limit_type,formIndex,keyName}:CharLimitValidationType & FormIndexType)=>{
    const {values,setFieldValue,errors,touched} = useFormikContext<FormInitType>();
    const changeKeyName = limit_type === 'min' ?  'isMinLimit' : 'isMaxLimit';
    const label = limit_type === 'min' ? 'Start' : 'End'
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label={`${label} Date`}
                  slots={{
                    textField : forwardRef<HTMLDivElement, TextFieldProps>(
                        (props, ref) => (
                          <TextField
                            {...props}
                            ref={ref}
                            fullWidth
                            error={isError}
                            helperText={isError}
                            variant="outlined"
                            disabled = {!getNestedValue(setFieldValueFirstArg(formIndex,keyName + changeKeyName as fieldKeyType),values)}
                            InputProps={{
                              ...props.InputProps,
                              endAdornment: (
                                <InputAdornment position="end">
                                    <FormControlLabel control={<Switch onChange={handleLimitDisableEnableChange} checked = {!getNestedValue(setFieldValueFirstArg(formIndex,keyName + changeKeyName as fieldKeyType),values)} defaultChecked />} label={`No ${label} Date`} />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )
                      )
                  }}

                />
            </DemoContainer>
        </LocalizationProvider>
        {/* <TextField
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
        /> */}
    </Box>
}

export {DateCategory, DateOptions}