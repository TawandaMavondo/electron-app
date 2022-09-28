import {
  Box,
  Card,
  Container,
  FormGroup,
  TextField,
  Toolbar,
} from '@mui/material';
import React, { FormEvent } from 'react';
import { withStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    width: '50vw',
  },
  textField: {
    paddingBottom: '25px',
  },
});

const UserPage: React.FC = (props: any) => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;

    const payload = { name };
    console.log(payload);
  };
  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />

        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Card style={{ padding: '20px', }}>
            <h1>User Information</h1>
            <form method="POST" style={{width:"50vw"}} onSubmit={handleSubmit}>
              <FormGroup className={props.classes.root}>
                <TextField
                  className={props.classes.textField}
                  label="First Name"
                  name="firstName"
                />
                <TextField
                  className={props.classes.textField}
                  label="Last Name"
                  name="lastName"
                />
                <TextField
                  className={props.classes.textField}
                  label=""
                  name="dateOfBirth"
                  type={'date'}
                />
                <Toolbar />

                <LoadingButton
                  sx={{ background: 'purple' }}
                  loading={loading}
                  style={{ width: '150px' }}
                  variant="contained"
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  Save
                </LoadingButton>
              </FormGroup>
            </form>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default withStyles(styles)(UserPage);
