import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { getNestedValue, setFieldValueFirstArg } from "../../Routes/Utils/HomeUtils";
import { gen_num_array, num_basic_type, num_digit_type, num_multiple_type, num_range_type, num_selected_type } from "../../Routes/Utils/numCategoryUtils";
import { GeneralTextFieldHandler, ReusableCheckBox, ValidationTextFieldMessage } from "../GeneralComponents/GeneralComponents";

const NumberCategory = ({formIndex}:FormIndexType)=>{
    const {values} = useFormikContext<FormInitType>();
    return <>
        <Grid container spacing={4}>
            <Grid item md={6} sm={12}>
            <SelectNumberType formIndex={formIndex}/>
            </Grid>
            <Grid item md={6} sm={12}>
            <SelectNumberFormat formIndex={formIndex}/>
            </Grid>
        </Grid>
        <NumberCategoryHandler formIndex={formIndex} type={getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedNumber.type' as fieldKeyType),values)}/>    
    </>
}

    const SelectNumberType = ({formIndex} : FormIndexType)=>{
    
      const {values,setFieldValue} = useFormikContext<FormInitType>();
      const handleNumberCategoryChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const numberType = (event.target as HTMLInputElement).value;
        switch(numberType){
            case "basic":
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedNumber'),{...num_basic_type});  
                break;
            case "range":
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedNumber'),{...num_range_type});  
                break;
            case "count":
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedNumber'),{...num_digit_type});  
                break;
            case "multiple":
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedNumber'),{...num_multiple_type});  
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
        label='Select Number Type'
        size="medium"
        InputProps={{
            inputComponent: () => <RadioGroup
                sx={{width:'100%',display:'flex',justifyContent:'space-around'}}
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedNumber.type' as fieldKeyType),values)}
                onChange={handleNumberCategoryChange}
                row
            >
            {num_selected_type.map((numType,index) => <FormControlLabel key={index} className="menuItem" control={<Radio size="medium" />} 
            label={numType}  value={numType}
             />)}
            </RadioGroup>
        }}
    />
    }


    const SelectNumberFormat = ({formIndex} : FormIndexType)=>{
        return <TextField
        variant="outlined"
        InputLabelProps={{
            shrink: true
        }}
        fullWidth
        className="textfield_parent"            
        label='Select Number Format'
        size="medium"
        InputProps={{
            inputComponent: () => <RadioGroup
                sx={{width:'100%',display:'flex',justifyContent:'space-around'}}
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                row
            >
            {gen_num_array.map(({keyName,label},index:number)=><Grid key={index} item sm={2.5}><ReusableCheckBox formIndex={formIndex} label={label} 
            keyName={`whenSelectedNumber.${keyName}` as fieldKeyType}
            /></Grid> )}
            </RadioGroup>
        }}
    />
    }

    const NumberCategoryHandler=({type,formIndex}:CategoryHandlerCompType & FormIndexType)=>{
        switch(type){
            case 'basic':
             return <></>;
            case 'count':
             return <>
               <GeneralTextFieldHandler label="Enter Count" placholder="Enter Count" formIndex={formIndex} keyName={'whenSelectedNumber.count'}/>   
               <ValidationTextFieldMessage formikKey={setFieldValueFirstArg(formIndex,'whenSelectedNumber.errorMessage' as fieldKeyType)} messageKey="Digit Count"/>
             </>
            case 'multiple':
             return <>
               <GeneralTextFieldHandler label="Enter Multiple of" placholder="Enter Multiple of" formIndex={formIndex} keyName={'whenSelectedNumber.multiple'}/>   
               <ValidationTextFieldMessage formikKey={setFieldValueFirstArg(formIndex,'whenSelectedNumber.errorMessage' as fieldKeyType)} messageKey="Multiple"/>
             </>;
             
             
        }
    }


    export {NumberCategory}