import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  IconButton,
  Grid,
  makeStyles,
  Box,
  Tooltip,
  CircularProgress
} from '@material-ui/core'
import DocumentInfomationForm from './components/document-information-form'
import SelectTemplateForm from './components/select-template-form'
import ConfirmCreateDocument from './components/confirm-create-document'
import CloseIcon from '@material-ui/icons/Close';
import { templateList } from './components/config'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Document Information', 'Select Template', 'Confirm Create Document'];
}

const CreateDocumentInputModal = ({ open, setOpen, createDocument, createDocumentGqlLoading, filename}) => {
  const classes = useStyles();
  const [docInfo, setDocInfo] = useState({
    name: '',
    visibility: 'PUBLIC',
    description: '',
  });
  const [template, setTemplate] = useState(templateList[0]);
  const [nextDisabled, setNextDisabled] = useState(true);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(()=> {
    if (activeStep === 0){
      if (docInfo.name && !filename.includes(docInfo.name) && !docInfo.name.includes(' ')){
        setNextDisabled(false)
      }else{
        setNextDisabled(true)
      }
    }
    if (activeStep === 1){
      if (template){
        setNextDisabled(false)
      }else{
        setNextDisabled(true)
      }
    }
  }, [docInfo, template, activeStep])

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='lg'
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" style={{ margin: '1.5rem 2rem' }}>Create Document</Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Cancel">
              <IconButton size="large" style={{ margin: '0rem 1rem' }} onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div style={{ maxHeight: '70vh' }}>
          {activeStep === 0 && <DocumentInfomationForm docInfo={docInfo} setDocInfo={setDocInfo} filename={filename} />}
          {activeStep === 1 && <SelectTemplateForm template={template} setTemplate={setTemplate} />}
          {activeStep === 2 && <ConfirmCreateDocument docInfo={docInfo} template={template} />}

          <Box my={4} />
          <Grid container justify="center">
            <Grid item>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
            </Button>
              {activeStep === steps.length - 1
                ?
                <Button variant="contained" color="primary" onClick={() => createDocument(docInfo, template)} disabled={createDocumentGqlLoading}>
                  {createDocumentGqlLoading ? <CircularProgress size={24} /> : 'Finish'}
                </Button>
                :
                <Button variant="contained" color="primary" onClick={handleNext} disabled={nextDisabled}>
                  Next
                </Button>
              }

            </Grid>
          </Grid>
          <Box my={4} />
        </div>
      </Dialog>
    </>
  )
}

export default CreateDocumentInputModal