import { Box, Checkbox, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Switch, TextField } from "@mui/material";
import "./Home.css";
import { ArrayHelpers, FieldArray, Formik, useFormikContext } from "formik";
import { formInitialValues, setFieldValueFirstArg, typeValue } from "../Utils/HomeUtils";
import { basicInitValue, emailInitValue, minMaxInitValue, passwordFormUtils, passwordInitValue, stringSelectedType, urlInitValue } from "../Utils/stringCategoryUtils";
import { ChangeEvent, useEffect } from "react";


const getNestedValue = (keyName:string,values:FormInitType) => {
    return keyName.split(/[\.\[\]]+/).filter(Boolean).reduce((acc:any, part) => acc && acc[part], values);
};

export const Home = () => {
    return (
        <Box className="parentCont global_column_flex">
            <Formik
                initialValues={formInitialValues}
                onSubmit={(values) => { }}
                enableReinitialize
                validateOnChange
                validateOnBlur
            // validationSchema={invoiceValidationSchema}
            >
                {(formikProps) => {
                    return (
                        <>
                            <Box>
                                <FieldArray
                                    name="invoice_items_attributes"
                                    render={(arrayHelpers: ArrayHelpers) => (
                                        <>
                                            {formikProps.values.formInitialValues.map(
                                                (_formElem, formIndex: number) => {
                                                    return (
                                                        <Box key={formIndex}>
                                                            <EachKeyForm formIndex={formIndex}/>
                                                            {/* <EachInvoiceForm formikProps={formikProps} formIndex={formIndex} arrayHelpers={arrayHelpers}/> */}
                                                        </Box>
                                                    );
                                                }
                                            )}
                                        </>
                                    )}
                                />
                            </Box>

                            {/* Generate Schema and Add key Button */}
                        </>
                    );
                }}
            </Formik>
        </Box>
    );
};


const EachKeyForm = ({formIndex}:EachKeyForm) => {
    const {values,setFieldValue} =  useFormikContext<FormInitType>();
    const eachFormValue = values['formInitialValues'][formIndex];
    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>,fieldKey:keyof EachFormInitialValueType) => {
        setFieldValue(setFieldValueFirstArg(formIndex,fieldKey),event.target.checked);
      };

    const handleTypeChange=(event:SelectChangeEvent)=>{
        const value = event.target.value;
        setFieldValue(setFieldValueFirstArg(formIndex,'type'),value);
        switch(value){
            case 'string':
            setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString'),{...basicInitValue});
            break;
            default:
            setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString'),null);
        }
      };

    return <Box className='global_column_flex'>
        <Grid container spacing={3} alignItems={'center'}>
            <Grid item lg={8} sm={6}><TextField autoComplete="off" label='Key Name' placeholder="Key Name" variant="outlined" fullWidth /></Grid>
            <Grid item lg={2}> <FormControlLabel  control={<Checkbox  onChange={(event)=>handleCheckBoxChange(event,'isRequired')}/>} checked={eachFormValue.isRequired} label="IsRequired?" /></Grid>
            <Grid item lg={2}> <FormControlLabel control={<Checkbox  onChange={(event)=>handleCheckBoxChange(event,'isNullable')} />} checked={eachFormValue.isNullable}  label="IsNullable?" /></Grid>
        </Grid>
        {eachFormValue.isRequired && <ValidationTextFieldMessage messageKey="Required" formikKey={setFieldValueFirstArg(formIndex,'requireMessage')}/>}
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{textTransform:'capitalize'}}
                value={getNestedValue(setFieldValueFirstArg(formIndex,'type'),values)}
                label="Select Type"
                onChange={handleTypeChange}
            >
                {typeValue.map((type) => <MenuItem value={type} className='menuItem'>{type}</MenuItem>)}
            </Select>
        </FormControl >
            <CategoryHandler formIndex={formIndex} type={getNestedValue(setFieldValueFirstArg(formIndex,'type'),values)}/>
    </Box>
}


const CategoryHandler=({type,formIndex}:CategoryHandlerCompType & FormIndexType)=>{
    switch (type){
        case 'string':
        return <StringCategory formIndex={formIndex}/>
        default : 
        return <></>
    }
}

const StringCategory = ({formIndex}:FormIndexType) => {
    const {values,setFieldValue} = useFormikContext<FormInitType>();
    console.log(getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedString' as fieldKeyType),values))
    const handleStringCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const stringType = (event.target as HTMLInputElement).value;
        setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString.type' as fieldKeyType),stringType);
        switch(stringType){
            case 'password':
            setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString'),{...passwordInitValue});  
            break;

            case 'email':
            setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString'),{...emailInitValue});  
            break;

            case 'url':
            setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString'),{...urlInitValue});  
            break;

            case 'min max':
            setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString'),{...minMaxInitValue});  
            break;

            default:
            setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString'),{...basicInitValue});      
        }

      };
    return <>
        <TextField
            variant="outlined"
            InputLabelProps={{
                shrink: true
            }}
            className="textfield_parent"            
            label='Select String Type'
            size="medium"
            InputProps={{
                inputComponent: () => <RadioGroup
                    sx={{width:'100%',display:'flex',justifyContent:'space-around'}}
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedString.type' as fieldKeyType),values)}
                    onChange={handleStringCategoryChange}
                    row
                >
                {stringSelectedType.map((stringType) => <FormControlLabel className="menuItem" value={stringType} control={<Radio size="medium" />} label={stringType} />)}
                </RadioGroup>
            }}
        />
        <StringCategoryComponentsHandler formIndex={formIndex} stringType={getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedString.type' as fieldKeyType),values)}/>
    </>
}

const StringCategoryComponentsHandler=({stringType,formIndex} :StringCategoryComponentsHandlerType & FormIndexType)=>{
     switch (stringType) {
        case 'password' : 
        return <PasswordValidation formIndex={formIndex}/>;    

        case 'email' : 
        return <ValidationTextFieldMessage messageKey="Email" formikKey={setFieldValueFirstArg(formIndex,'whenSelectedString.errorMessage' as fieldKeyType)}/>    

        case 'url' : 
        return <ValidationTextFieldMessage messageKey="URL" formikKey={setFieldValueFirstArg(formIndex,'whenSelectedString.errorMessage' as fieldKeyType)}/>    
  
        case 'min max' : 
        // return <MinMaxLimitReusableComp formIndex={formIndex}/>    

        default:
        return <></>
     }
}

// String Types 
const ValidationTextFieldMessage = ({messageKey,formikKey}:ValidationTextFieldMessageType)=>{
    const {setFieldValue,values} =  useFormikContext<FormInitType>();
    const placholderLabel = `Enter ${messageKey} Validation Message`;
    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        setFieldValue(formikKey,event.target.value);
    }
    return <TextField onChange={handleChange} value={getNestedValue(formikKey,values)} autoComplete="off" placeholder={placholderLabel}  label = {placholderLabel} fullWidth/>
}

const PasswordValidation=({formIndex}: FormIndexType)=>{
    // const {values,setFieldValue} = useFormikContext<FormInitType>();
    return <>
            <TextField
            variant="outlined"
            InputLabelProps={{
                shrink: true
            }}
            className="textfield_parent"            
            label='Password Security'
            size="medium"
            InputProps={{
                inputComponent : ()=><Grid container justifyContent={'space-around'}>
                {passwordFormUtils.map(({keyName,label})=><Grid item sm={2.5}><ReusableCheckBox formIndex={formIndex} label={label} keyName={`whenSelectedString.${keyName}` as fieldKeyType}/></Grid> )}
             </Grid>
            }}
            />            
        <MinMaxLimitReusableComp formIndex={formIndex} keyName="whenSelectedString."/>
        <ValidationTextFieldMessage messageKey="Password" formikKey={setFieldValueFirstArg(formIndex,'whenSelectedString.errorMessage' as fieldKeyType)}/>
        </>
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

const MinMaxLimitReusableComp=({formIndex,keyName}:FormIndexType & MinMaxLimitReusableCompType)=>{
    return <Grid container spacing={2}>
        <Grid item sm={6}><CharLimitValidation limit_type="min" formIndex={formIndex} keyName={keyName}/></Grid>
        <Grid item sm={6}><CharLimitValidation limit_type="max" formIndex={formIndex} keyName={keyName}/></Grid>  
        {/* <Grid item sm={12}><ValidationTextFieldMessage /></Grid> */}
    </Grid>
}

const CharLimitValidation=({limit_type,formIndex,keyName}:CharLimitValidationType & FormIndexType)=>{
    const {values,setFieldValue} = useFormikContext<FormInitType>();
    const changeKeyName = limit_type === 'min' ?  'isMinLimit' : 'isMaxLimit'
    const handleLimitDisableEnableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(setFieldValueFirstArg(formIndex,keyName + changeKeyName as fieldKeyType),event.target.checked);
      };
    return <Box>
        {/* <ReusableCheckBox label="No Min Limit"/> */}
        <TextField
            autoComplete="off"
            variant="outlined"
            placeholder="Enter Min Limit"
            label={"Enter Min Limit"}
            fullWidth
            type="number"
            disabled = {getNestedValue(setFieldValueFirstArg(formIndex,keyName + changeKeyName as fieldKeyType),values)}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                      <FormControlLabel control={<Switch onChange={handleLimitDisableEnableChange} checked = {getNestedValue(setFieldValueFirstArg(formIndex,keyName + changeKeyName as fieldKeyType),values)} defaultChecked />} label={`No ${limit_type} Limit`} />
                  </InputAdornment>
                )
              }}
        />
    </Box>
}