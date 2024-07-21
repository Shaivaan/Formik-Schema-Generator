import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <Grid container justifyContent={"center"}>
      <Grid xs={12} sm={12} md={8}>
        <WelcomeContent />
        <HowItWorkAndFeature/>
      </Grid>
    </Grid>
  );
};

const HowItWorkAndFeature=()=>{
    return <Grid container spacing={4}>
        <Grid item xs={12} md={6}><Feauters /></Grid>
        <Grid item xs={12} md={6}><HowItWork/></Grid>
    </Grid>
}

const SchemExamples = () => {
  return (
    <Box my={4}>
      <Box my={2}></Box>
      <Box my={2}>
        <Paper elevation={2} sx={{ p: 3 }} className="code_parent paper_comp">
          <Typography component="pre" textAlign={"left"}>
            {`import * as Yup from 'yup';

const generateSchema = Yup.object().shape({
email: Yup.string().email('Please enter valid Email').nullable().required('Email is Required*'),
password: Yup.string().required('Password is Required*'),
name: Yup.string().required('Name is required'),
age: Yup.number().integer('Must be an integer').positive('Must be a positive number').required('Age is Required*'),
});`}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const HowItWork = () => {
  return (
    <Paper sx={{ p: 3,height:'100%' }} className="paper_comp">
      <Box>
        <Typography variant="h4" gutterBottom width={'100%'}>
          How It Works
        </Typography>
        <Typography variant="body1" marginLeft={'2rem'}>
          <ol>
            <li>Go to the Schema Generator form.</li>
            <li>Fill out the form with your validation criteria.</li>
            <li>Generate and copy your schema.</li>
          </ol>
        </Typography>
      </Box>
    </Paper>
  );
};

const WelcomeContent = () => {
  const navigate = useNavigate();
  return (
    <Box my={4} py={6} textAlign={"center"} borderRadius={2}>
      <Typography variant="h3" gutterBottom>
        Welcome to Schema Generator
      </Typography>

      <Typography variant="h5" gutterBottom>
        Easily create validation schemas for your forms
      </Typography>

      <SchemExamples />
      <Button
        variant="contained"

        size="large"
        onClick={() => navigate("/schema")}
        className="global_dark_button"
        sx={{textTransform:'capitalize'}}    
      >
        Start Generating Schema
      </Button>
    </Box>
  );
};

const Feauters = () => {
  return (
    <Paper  sx={{ p: 3 }} className="paper_comp">
    <Box >
      <Typography variant="h4" gutterBottom width={'100%'}>
        Features
      </Typography>
        <Box marginLeft={'2rem'}>
            <ol>
                <li> <Typography variant="body1">
                Generate Yup validation schemas with ease.
                </Typography></li>
                <li>  <Typography variant="body1">
                Supports string, number, date, and file validations.
                </Typography></li>
                <li> <Typography variant="body1">
                Customizable validation rules.
                </Typography></li>
                <li>  <Typography variant="body1">
                Instantly copy generated schemas.
                </Typography></li>
            </ol>
        </Box>
          
           
      
    </Box>

    </Paper>
  );
};

export default LandingPage;
