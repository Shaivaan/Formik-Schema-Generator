import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material"
import { GeneralTextFieldHandler, ReusableCheckBox } from "../GeneralComponents/GeneralComponents"
import { file_category, file_multiple, file_single, file_util_arry } from "../../Routes/Utils/FileUtils"
import { getNestedValue, setFieldValueFirstArg } from "../../Routes/Utils/HomeUtils"
import { useFormikContext } from "formik"

const FileCategory = ({formIndex} : FormIndexType)=>{
    const {values} = useFormikContext<FormInitType>();
    const isFileExtensionRequired = getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedFile.isFileType' as unknown as fieldKeyType),values);
    const isFileSizeChecked  = getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedFile.isFileSizeValidate' as unknown as fieldKeyType),values);
    return <>

        <Grid container spacing={2}>
            <Grid item xs={6}><FileSelectCategory formIndex={formIndex}/></Grid>
            <Grid item xs={6}><FileUtilsSelect formIndex={formIndex}/></Grid>
        </Grid>
       {isFileSizeChecked && <GeneralTextFieldHandler formIndex={formIndex} keyName="whenSelectedFile.fileSize" label="Enter File Size (kb)" placholder="Enter File Size"/>}
       {isFileExtensionRequired && <>Select</>}
    </>
}





const FileUtilsSelect=({formIndex} : FormIndexType)=>{
    return <TextField
    variant="outlined"
    InputLabelProps={{
        shrink: true
    }}
    fullWidth
    className="textfield_parent"            
    label='Select File Options'
    size="medium"
    InputProps={{
        inputComponent: () => <RadioGroup
            sx={{width:'100%',display:'flex',justifyContent:'space-around'}}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            row
        >
        {file_util_arry.map(({keyName,label},index:number)=><Grid key={index} item><ReusableCheckBox formIndex={formIndex} label={label} 
        keyName={`whenSelectedFile.${keyName}` as fieldKeyType}
        /></Grid> )}
        </RadioGroup>
    }}
/>
}

const FileSelectCategory=({formIndex} : FormIndexType)=>{
    const {values,setFieldValue} = useFormikContext<FormInitType>();
    const gen_file_option = {
        isFileSizeValidate : getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedFile.isFileSizeValidate' as fieldKeyType),values),
        isFileType : getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedFile.isFileType' as fieldKeyType),values),
        fileSize : getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedFile.fileSize' as fieldKeyType),values),
        allowedFile : getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedFile.allowedFile' as fieldKeyType),values),
      }

    const handleFileCategoryChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const numberType = (event.target as HTMLInputElement).value;
        switch(numberType){
            case "single":
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedFile'),{...file_single,...gen_file_option});  
                break;
            case "multiple":
                setFieldValue(setFieldValueFirstArg(formIndex,'whenSelectedFile'),{...file_multiple,...gen_file_option});  
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
    label='Select File Category'
    size="medium"
    InputProps={{
        inputComponent: () => <RadioGroup
            sx={{width:'100%',display:'flex',justifyContent:'space-around'}}
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={getNestedValue(setFieldValueFirstArg(formIndex,'whenSelectedFile.type' as fieldKeyType),values)}
            onChange={handleFileCategoryChange}
            row
        >
        {file_category.map((file_cat_type,index) => <FormControlLabel key={index} className="menuItem" control={<Radio size="medium" />} 
        label={`${file_cat_type} File`}  value={file_cat_type}
         />)}
        </RadioGroup>
    }}
/>
}

export {FileCategory}