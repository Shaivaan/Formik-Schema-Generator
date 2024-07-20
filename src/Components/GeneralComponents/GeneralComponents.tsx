import { Alert, Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Modal, Snackbar, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { getNestedValue, setFieldValueFirstArg } from "../../Routes/Utils/HomeUtils";
import { useFormikContext } from "formik";
import { ChangeEvent } from "react";
import { useStore } from "../../Zustand/Zustand";
import { CopyAll, InfoOutlined } from "@mui/icons-material";
const snackbarBarCloseTime = 2000;

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60rem',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:'10px'
  };

const ValidationTextFieldMessage = ({messageKey,formikKey}:ValidationTextFieldMessageType)=>{
    const {setFieldValue,values,errors,touched} =  useFormikContext<FormInitType>();
    const placholderLabel = `Enter ${messageKey} Validation Message`;
    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        setFieldValue(formikKey,event.target.value);
    }
    const errorMessage = getNestedValue(formikKey,errors);
    const isError =  getNestedValue(formikKey,touched) && getNestedValue(formikKey,errors);
    return <TextField error={isError} helperText={errorMessage} onChange={handleChange} value={getNestedValue(formikKey,values)} autoComplete="off" placeholder={placholderLabel}  label = {placholderLabel} fullWidth/>
}


const GeneralTextFieldHandler=({formIndex,keyName,label,placholder}:FormIndexType & KeyNameType & LabelPlaceholderType)=>{
    const {values,handleChange,touched,errors} = useFormikContext<FormInitType>();
    const textFieldValue = getNestedValue(setFieldValueFirstArg(formIndex,keyName as fieldKeyType),values);
    const isError = getNestedValue(setFieldValueFirstArg(formIndex,keyName as fieldKeyType),touched) && getNestedValue(setFieldValueFirstArg(formIndex,keyName as fieldKeyType),errors);
    return <TextField fullWidth error={isError} helperText={getNestedValue(setFieldValueFirstArg(formIndex,keyName as fieldKeyType),errors)} variant="outlined" value={textFieldValue} label={label} placeholder={placholder} autoComplete="off" name={setFieldValueFirstArg(formIndex,keyName  as fieldKeyType)} onChange={handleChange}/>
    
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

const CharLimitValidation=({limit_type,formIndex,keyName}:CharLimitValidationType & FormIndexType)=>{
    const {values,setFieldValue,errors,touched} = useFormikContext<FormInitType>();
    const changeKeyName = limit_type === 'min' ?  'isMinLimit' : 'isMaxLimit';
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
        <TextField
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
        />
    </Box>
}


const SchemaModal = () => {
    const { isSchemaModal, schemaContent, setSchemaModal,setIsSnackbarVisible} = useStore();
  
    const handleClose = () => setSchemaModal(false);
  
    const handleCopy = () => {
      navigator.clipboard.writeText(schemaContent ?? '').then(() => {
        setIsSnackbarVisible(true);
      });
    };
  
    return (
      <Modal
        open={isSchemaModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Box className = 'global_justfiy_between'>
          <Typography id="modal-title" variant="h6" component="h2">
            Generated Schema
          </Typography>
          <IconButton onClick={handleCopy} color="primary">
              <CopyAll />
            </IconButton>

          </Box>
          <Box
            sx={{
              mt: 2,
              maxHeight: 300,
              overflowY: 'auto',
              bgcolor: '#f5f5f5',
              p: 2,
              borderRadius: 1,
            }}
          >
            <Typography id="modal-description" component="pre">
              {schemaContent}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };


  const SnackBarAlert=()=>{
    const {isSnackBarVisible,setIsSnackbarVisible } = useStore();
    const handleClose=()=>setIsSnackbarVisible(false)
    return <Snackbar open={isSnackBarVisible} autoHideDuration={snackbarBarCloseTime} onClose={handleClose} anchorOrigin={{
        vertical:'top',
        horizontal:'right'
    }}>
    <Alert
      onClose={handleClose}
      severity="success"
      variant="filled"
      sx={{ width: '100%' }}
    >
      Schema copied to clipboard!
    </Alert>
  </Snackbar>
  }


  const TooltipComponent=({title} : {title:string})=>{
    return  <Tooltip title={title}>
    <IconButton>
      <InfoOutlined />
    </IconButton>
  </Tooltip>
  }

  const LabelWithTooltip=({label,tooltipTitle}:LabelWithTooltipType)=>{
    return <Box className = 'global_flex'>
      <Box>{label}</Box>
      <TooltipComponent title={tooltipTitle}/>
    </Box>
  }

export {ValidationTextFieldMessage,GeneralTextFieldHandler,ReusableCheckBox,CharLimitValidation,SchemaModal,SnackBarAlert,TooltipComponent,LabelWithTooltip}