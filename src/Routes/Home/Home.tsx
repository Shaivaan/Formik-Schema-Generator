import { Box, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import "./Home.css";
import { ArrayHelpers, FieldArray, Formik, useFormikContext } from "formik";
import { formInitialValues, setFieldValueFirstArg, typeValue } from "../Utils/HomeUtils";
import { passwordFormUtils, stringSelectedType } from "../Utils/stringCategoryUtils";
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

    // const handleTypeChange=()=>{

    // }

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
                onChange={(event:SelectChangeEvent) => {setFieldValue(setFieldValueFirstArg(formIndex,'type'),event.target.value)}}
            >
                {typeValue.map((type) => <MenuItem value={type} className='menuItem'>{type}</MenuItem>)}
            </Select>
        </FormControl >
            <CategoryHandler type={getNestedValue(setFieldValueFirstArg(formIndex,'type'),values)}/>
    </Box>
}


const CategoryHandler=({type}:{type:CategoryHandlerType})=>{
    switch (type){
        case 'string':
        return <StringCategory/>
        default : 
        return <></>
    }
}

const StringCategory = () => {
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
                    value={'email'}
                    onChange={() => { }}
                    row
                >
                    {stringSelectedType.map((stringType) => <FormControlLabel className="menuItem" value="female" control={<Radio size="medium" />} label={stringType} />)}
                </RadioGroup>
            }}
            />
        {/* <ValidationTextFieldMessage/> */}
        {/* <PasswordValidation/> */}
        {/* <MinMaxLimitReusableComp/> */}
    </>
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

const PasswordValidation=()=>{
    return <>
            <Grid container justifyContent={'space-around'}>
               {passwordFormUtils.map((passwordUtil)=><Grid item sm={2.5}><ReusableCheckBox label={passwordUtil.label}/></Grid> )}
            </Grid>
        {/* <ValidationTextFieldMessage /> */}
        </>
}

const ReusableCheckBox=({label}:ReusableCheckBoxType)=>{
    return <FormControlLabel
    value="end"
    control={<Checkbox />}
    label={label}
    labelPlacement="end"
/>
}

const MinMaxLimitReusableComp=()=>{
    return <Grid container spacing={2}>
        <Grid item sm={6}><CharLimitValidation/></Grid>
        <Grid item sm={6}><CharLimitValidation/></Grid>  
        {/* <Grid item sm={12}><ValidationTextFieldMessage /></Grid> */}
        
    </Grid>
}

const CharLimitValidation=()=>{
    return <Box>
        <ReusableCheckBox label="No Min Limit"/>
        <TextField autoComplete="off" variant="outlined" placeholder="Enter Min Limit" label={"Enter Min Limit"} fullWidth/>
    </Box>
}