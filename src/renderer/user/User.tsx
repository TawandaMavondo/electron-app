import {
  Alert,
  Box,
  Card,
  Container,
  FormGroup,
  MenuItem,
  Snackbar,
  TextField,
  Toolbar,
} from '@mui/material';
import React, { FormEvent } from 'react';
import { withStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from 'react';

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
  const [userLevel, setUserLevel] = React.useState('admin');
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [done, setDone] = React.useState<boolean>(false);

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const payload = { name, lastName, dateOfBirth, userLevel };
    window.electron.store.set('user', payload);
    console.log(payload);
    setLoading(false);
    setDone(true);
  };

  useEffect(() => {
    const user = window.electron.store.get('user');

    if (user) {
      setDateOfBirth(user.dateOfBirth);
      setName(user.name);
      setLastName(user.lastName);
      setUserLevel(user.userLevel);
    } else {
    }
  }, []);
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
          <Card style={{ padding: '20px' }}>
            <h1>User Information</h1>
            <form
              method="POST"
              style={{ width: '50vw' }}
              onSubmit={handleSubmit}
            >
              <FormGroup className={props.classes.root}>
                <TextField
                  className={props.classes.textField}
                  label="First Name"
                  name="firstName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  className={props.classes.textField}
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  className={props.classes.textField}
                  label="Date Of Birth"
                  name="dateOfBirth"
                  type={'date'}
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <TextField
                  className={props.classes.textField}
                  id="outlined-select-currency"
                  select
                  label="User Level"
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value)}
                >
                  <MenuItem key={'1'} value={'admin'}>
                    {'Administrator'}
                  </MenuItem>
                  <MenuItem key={'2'} value={'editor'}>
                    {'Editor'}
                  </MenuItem>
                </TextField>
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
          <Snackbar
            open={done}
            autoHideDuration={3000}
            onClose={() => setDone(false)}
          >
            <Alert severity="success">New Order is Saved</Alert>
          </Snackbar>
        </Container>
      </Box>
    </>
  );
};

export default withStyles(styles)(UserPage);
