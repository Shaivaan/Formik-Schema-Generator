import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputLabel, MenuItem, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import "./Home.css";
import { ArrayHelpers, FieldArray, Formik, useFormikContext } from "formik";
import { createSchemaStringFromValues, eachKeyForm, formInitialValues, getNestedValue, setFieldValueFirstArg, typeValue } from "../Utils/HomeUtils";
import { basicInitValue } from "../Utils/StringCategoryUtils";
import { ChangeEvent, FormEvent } from "react";
import { mainFormSchema } from "../../Components/Schema/MainFormSchema";
import {  gen_num_option, num_basic_type } from "../Utils/NumCategoryUtils";
import { LabelWithTooltip, SchemaModal, SnackBarAlert, ValidationTextFieldMessage } from "../../Components/GeneralComponents/GeneralComponents";
import { NumberCategory } from "../../Components/Number/NumberComp";
import { StringCategory } from "../../Components/String/StringComp";
import { DateCategory } from "../../Components/Date/DateComp";
import { basic_date_type, date_utils } from "../Utils/DateUtils";
import { FileCategory } from "../../Components/File/FileComp";
import { file_single, file_util } from "../Utils/FileUtils";
import { Delete } from "@mui/icons-material";
import { useStore } from "../../Zustand/Zustand";
import LoadingButton from '@mui/lab/LoadingButton';
import { isNullableText, requiredText } from "../Utils/TooltipText";



export const Home = () => {
    const {setSchemaModal, setSchemaContent,setIsProcessing, isProcessing } = useStore();
    return (
        <>
        <SchemaModal/>
        <SnackBarAlert/>
        <Grid container justifyContent={'center'} sx={{marginTop:'2rem'}}>
            <Grid lg={10} md={10} sm={12} xs={12}>
                <Formik
                    initialValues={formInitialValues}
                    onSubmit={(values:FormInitType) => { 
                        setIsProcessing(true);
                        setSchemaContent(createSchemaStringFromValues(values.formInitialValues));
                        setSchemaModal(true);
                        setIsProcessing(false);
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
                                        render={({push,remove}: ArrayHelpers) => (
                                            <Box className = 'global_column_flex' sx={{columnGap:'2rem'}}>
                                                {values.formInitialValues.map(
                                                    (_formElem, formIndex: number) => {
                                                        return (
                                                            <Box key={formIndex} className = 'each_form'>
                                                                {formIndex !== 0 && <Box className='end_align'><IconButton onClick={()=>remove(formIndex)}><Delete className="delete_icon"/></IconButton></Box>}
                                                                <EachKeyForm formIndex={formIndex}/>                                                           
                                                            </Box>
                                                        );
                                                    }
                                                )}
                                                <Box className = 'global_column_flex each_form'>
                                                <LoadingButton loading={isProcessing} disabled={isProcessing} fullWidth variant="contained" size="large" onClick={()=>push({...eachKeyForm})}>Add One More Key</LoadingButton>
                                                <LoadingButton disabled={isProcessing} fullWidth variant="outlined" size="large" onClick={(event)=>handleSubmit(event as unknown as FormEvent<HTMLFormElement>)}>Generate Schema</LoadingButton>
                                                </Box>
                                            </Box>
                                        )}
                                    />
                                </Box>
                            </>
                        );
                    }}
                </Formik>
            </Grid>
        </Grid>
        </>
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
        setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedFile'),null);
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
            case 'file':
                nullMaker();
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedFile'),{...file_util,...file_single}); 
                break;               
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

    return <Box className="global_column_flex">
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField error={isKeyNameError} helperText={getNestedValue(setFieldValueFirstArg(formIndex,'keyName'),errors)} onChange={handleKeyNameChange} value={keyNameTextfieldValue} autoComplete="off" label='Key Name' placeholder="Key Name" variant="outlined" fullWidth /></Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true
                    }}
                    className="textfield_parent" 
                    size="medium"
                    InputProps={{
                        inputComponent: () => <RadioGroup
                            sx={{width:'100%',display:'flex',justifyContent:'space-around'}}
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            row
                        >
                        <FormControlLabel  control={<Checkbox  onChange={(event)=>handleCheckBoxChange(event,'isRequired')}/>} checked={eachFormValue.isRequired} label={<LabelWithTooltip label={"IsRequired?"} tooltipTitle={requiredText}/>}   />
                        <FormControlLabel control={<Checkbox  onChange={(event)=>handleCheckBoxChange(event,'isNullable')} />} checked={eachFormValue.isNullable}  label={<LabelWithTooltip label={"IsNullable?"} tooltipTitle={isNullableText}/>}/>
                        </RadioGroup>
                    }}
                />  
            </Grid>
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
        case 'file':
            return <FileCategory formIndex={formIndex}/>                        
        default : 
            return <></>;
    }
}