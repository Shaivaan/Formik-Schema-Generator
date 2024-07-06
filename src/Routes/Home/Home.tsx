import { Box, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import "./Home.css";
import { ArrayHelpers, FieldArray, Formik, useFormikContext } from "formik";
import { formInitialValues, typeValue } from "../Utils/HomeUtils";
import { stringSelectedType } from "../Utils/stringCategoryUtils";

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
    const {values} =  useFormikContext();
    console.log(values,'dasdasd')
    return <Box className='global_column_flex'>
        <Grid container spacing={3} alignItems={'center'}>
            <Grid item lg={8} sm={6}><TextField autoComplete="off" label='Key Name' placeholder="Key Name" variant="outlined" fullWidth /></Grid>
            <Grid item lg={2}> <FormControlLabel control={<Checkbox defaultChecked />} label="IsRequired?" /></Grid>
            <Grid item lg={2}> <FormControlLabel control={<Checkbox defaultChecked />} label="IsNullable?" /></Grid>
        </Grid>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={''}
                label="Select Type"
                onChange={() => { }}
            >
                {typeValue.map((type) => <MenuItem value={type} className='menuItem'>{type}</MenuItem>)}
            </Select>
        </FormControl >
            <StringCategory />
    </Box>
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
        <PasswordValidation/>
    </>
}

// String Types 
const ValidationTextFieldMessage = ()=>{
    const placholderLabel = "Enter Email Validation Message"
    return <TextField placeholder={placholderLabel} label = {placholderLabel}/>
}

const PasswordValidation=()=>{
    return <>
        <Box>
            <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="End"
                labelPlacement="end"
            />
        </Box>    


        <ValidationTextFieldMessage />
    </>
}