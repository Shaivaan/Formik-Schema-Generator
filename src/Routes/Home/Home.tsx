import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import "./Home.css";
import { ArrayHelpers, FieldArray, Formik, useFormikContext } from "formik";
import { createSchemaStringFromValues, eachKeyForm, formInitialValues, getNestedValue, setFieldValueFirstArg, typeValue } from "../Utils/HomeUtils";
import { basicInitValue } from "../Utils/stringCategoryUtils";
import { ChangeEvent, FormEvent } from "react";
import { mainFormSchema } from "../../Components/Schema/MainFormSchema";
import {  gen_num_option, num_basic_type } from "../Utils/numCategoryUtils";
import { ValidationTextFieldMessage } from "../../Components/GeneralComponents/GeneralComponents";
import { NumberCategory } from "../../Components/Number/NumberComp";
import { StringCategory } from "../../Components/String/StringComp";
import { DateCategory } from "../../Components/Date/DateComp";
import { basic_date_type, date_utils } from "../Utils/DateUtils";



export const Home = () => {
    return (
        <Box>
            <Formik
                initialValues={formInitialValues}
                onSubmit={(values:FormInitType) => { 
                    console.log(values);
                    console.log(createSchemaStringFromValues(values.formInitialValues));
                }}
                enableReinitialize
                validateOnChange
                validateOnBlur
                validationSchema={mainFormSchema}
            >
                {({values,handleSubmit}) => {
                    return (
                        <>
                            <Box>
                                <FieldArray
                                    name="formInitialValues"
                                    render={({push}: ArrayHelpers) => (
                                        <Box className = 'global_column_flex'>
                                            {values.formInitialValues.map(
                                                (_formElem, formIndex: number) => {
                                                    return (
                                                        <Box key={formIndex}>
                                                            <EachKeyForm formIndex={formIndex}/>                                                           
                                                        </Box>
                                                    );
                                                }
                                            )}
                                            <Box className = 'parentCont global_column_flex'>
                                             <Button fullWidth variant="contained" size="large" onClick={()=>push({...eachKeyForm})}>Add One More Key</Button>
                                             <Button fullWidth variant="outlined" size="large" onClick={(event)=>handleSubmit(event as unknown as FormEvent<HTMLFormElement>)}>Generate Schema</Button>

                                            </Box>
                                        </Box>
                                    )}
                                />
                            </Box>
                        </>
                    );
                }}
            </Formik>
        </Box>
    );
};


const EachKeyForm = ({formIndex}:EachKeyForm) => {
    const {values,setFieldValue,errors,touched} =  useFormikContext<FormInitType>();
    const eachFormValue = values['formInitialValues'][formIndex];
    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>,fieldKey:keyof EachFormInitialValueType) => {
        setFieldValue(setFieldValueFirstArg(formIndex,fieldKey),event.target.checked);
      };

    const nullMaker=()=>{
        setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString'),null);
        setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedNumber'),null);
        setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedDate'),null);
    }

    const handleTypeChange=(event:SelectChangeEvent)=>{
        const value = event.target.value;
        setFieldValue(setFieldValueFirstArg(formIndex,'type'),value);
        switch(value){
            case 'string':
                nullMaker();
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString'),{...basicInitValue});
            break;
            case 'number':
                nullMaker();
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedNumber'),{...gen_num_option,...num_basic_type});
            break;
            case 'date':
                nullMaker();
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedDate'),{...date_utils,...basic_date_type});
            break;
                default:
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedString'),null);
        }
      };

      const handleKeyNameChange=(event:ChangeEvent<HTMLInputElement>)=>{
        setFieldValue(setFieldValueFirstArg(formIndex,'keyName'),event.target.value);
}

     const isKeyNameError = getNestedValue(setFieldValueFirstArg(formIndex,'keyName'),touched) &&  getNestedValue(setFieldValueFirstArg(formIndex,'keyName'),errors)
     const isTypeError = getNestedValue(setFieldValueFirstArg(formIndex,'type'),touched) &&  getNestedValue(setFieldValueFirstArg(formIndex,'type'),errors);
     const keyNameTextfieldValue = getNestedValue(setFieldValueFirstArg(formIndex,'keyName'),values)

    return <Box className="parentCont global_column_flex">
        <Grid container spacing={3} alignItems={'center'}>
            <Grid item lg={8} sm={6}><TextField error={isKeyNameError} helperText={getNestedValue(setFieldValueFirstArg(formIndex,'keyName'),errors)} onChange={handleKeyNameChange} value={keyNameTextfieldValue} autoComplete="off" label='Key Name' placeholder="Key Name" variant="outlined" fullWidth /></Grid>
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
                error={isTypeError}
            >
                {typeValue.map((type) => <MenuItem key={type} value={type} className='menuItem'>{type}</MenuItem>)}
            </Select>
             {isTypeError && <FormHelperText error={isTypeError}>{getNestedValue(setFieldValueFirstArg(formIndex,'type'),errors)}</FormHelperText>}
            
        </FormControl >
            <CategoryHandler formIndex={formIndex} type={getNestedValue(setFieldValueFirstArg(formIndex,'type'),values)}/>
    </Box>
}


const CategoryHandler=({type,formIndex}:CategoryHandlerCompType & FormIndexType)=>{
    switch (type){
        case 'string':
            return <StringCategory formIndex={formIndex}/>
        case 'number':
            return <NumberCategory formIndex={formIndex}/>
        case 'date':
            return <DateCategory formIndex={formIndex}/>            
        default : 
            return <></>;
    }
}