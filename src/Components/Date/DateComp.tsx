import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material"
import { basic_date_type, date_option_type, date_util_arry, range_date_type } from "../../Routes/Utils/DateUtils"
import { ReusableCheckBox } from "../GeneralComponents/GeneralComponents"
import { useFormikContext } from "formik"
import { getNestedValue, setFieldValueFirstArg } from "../../Routes/Utils/HomeUtils"


const DateCategory = ({formIndex}: FormIndexType)=>{
    return <Grid container spacing={4}>  
        <Grid sm={12} xs={12} item md={6}><DateOptions formIndex={formIndex}/></Grid>
        <Grid sm={12} xs={12} item md={6}><DateUtils formIndex={formIndex}/></Grid>
    </Grid>
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
export {DateCategory, DateOptions}