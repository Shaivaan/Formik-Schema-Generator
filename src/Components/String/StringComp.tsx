import { useFormikContext } from "formik";
import { CharLimitValidation, LabelWithTooltip, ReusableCheckBox, SwitchAndTextField, ValidationTextFieldMessage } from "../GeneralComponents/GeneralComponents";
import { basicInitValue, emailInitValue, minMaxInitValue, passwordFormUtils, passwordInitValue, stringSelectedType, urlInitValue } from "../../Routes/Utils/StringCategoryUtils";
import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { getNestedValue, setFieldValueFirstArg } from "../../Routes/Utils/HomeUtils";
import { stringCategoryText } from "../../Routes/Utils/TooltipText";

const StringCategory = ({formIndex}:FormIndexType) => {
    const {values,setFieldValue} = useFormikContext<FormInitType>();
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
                {stringSelectedType.map((stringType,index) => <FormControlLabel key={index} className="menuItem" value={stringType} control={<Radio size="medium" />}  label={<LabelWithTooltip label={stringType} tooltipTitle={stringCategoryText[index]}/> } />)}
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
        return <EmailHandler formIndex={formIndex}/>

        case 'url' : 
        return <UrlHandler formIndex={formIndex}/>
  
        case 'min max' : 
        return <>
        <MinMaxLimitReusableComp formIndex={formIndex} keyName="whenSelectedString."/>
        <ValidationTextFieldMessage messageKey="Min Max Limit" formikKey={setFieldValueFirstArg(formIndex,'whenSelectedString.errorMessage' as fieldKeyType)}/>    
        </>

        default:
        return <></>
     }
}

const EmailHandler=({formIndex} : FormIndexType)=>{
    return <>
        <ValidationTextFieldMessage messageKey="Email" formikKey={setFieldValueFirstArg(formIndex,'whenSelectedString.errorMessage' as fieldKeyType)}/>    
        <SwitchAndTextField swichLabel="Is Custom Email?" formIndex={formIndex} switchKeyName="whenSelectedString.isCustomEmail" keyName="whenSelectedString.customMail" label="Enter Custom Domain" placholder="Enter Custom Domain" />
    </>
}

const UrlHandler=({formIndex}:FormIndexType)=>{
    return <>
        <ValidationTextFieldMessage messageKey="URL" formikKey={setFieldValueFirstArg(formIndex,'whenSelectedString.errorMessage' as fieldKeyType)}/>  
        <SwitchAndTextField swichLabel="Is Custom URL?" formIndex={formIndex} switchKeyName="whenSelectedString.isCustomUrl" keyName="whenSelectedString.customUrl" label="Enter Custom URL" placholder="Enter Custom URL" />  
    </>
}


// String Types 


const PasswordValidation=({formIndex}: FormIndexType)=>{
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
                {passwordFormUtils.map(({keyName,label})=><Grid key={keyName} item sm={2.5} xs={6}><ReusableCheckBox formIndex={formIndex} label={label} keyName={`whenSelectedString.${keyName}` as fieldKeyType}/></Grid> )}
             </Grid>
            }}
            />            
        <MinMaxLimitReusableComp formIndex={formIndex} keyName="whenSelectedString."/>
        <ValidationTextFieldMessage messageKey="Password" formikKey={setFieldValueFirstArg(formIndex,'whenSelectedString.errorMessage' as fieldKeyType)}/>
        </>
   }



const MinMaxLimitReusableComp=({formIndex,keyName}:FormIndexType & MinMaxLimitReusableCompType)=>{
    return <Grid container spacing={2}>
        <Grid item sm={6} xs={12}><CharLimitValidation limit_type="min" formIndex={formIndex} keyName={keyName}/></Grid>
        <Grid item sm={6} xs={12}><CharLimitValidation limit_type="max" formIndex={formIndex} keyName={keyName}/></Grid>  
    </Grid>
}



export {StringCategory}