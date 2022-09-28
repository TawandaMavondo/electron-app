import {
  Alert,
  Box,
  Card,
  Container,
  MenuItem,
  Snackbar,
  TextField,
  Toolbar,
  // withStyles
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { withStyles } from '@mui/styles';

import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
const places = [
  {
    value: 'Tupelo, MS',
    label: 'Tupelo, MS',
  },
  {
    value: 'London, UK	',
    label: 'London, UK	',
  },
  {
    value: 'Boston, MA',
    label: 'Boston, MA	',
  },
  {
    value: 'Gary, IN',
    label: 'Gary, IN',
  },
];
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
const GetOrders: React.FC = (props: any) => {
  const [place, setPlace] = React.useState('Gary, IN');
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState<number>(0);
  const [date, setDate] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const handleSubmit: any = () => {
    setLoading(true);
    console.log(moment(date).toDate());

    let payload = {
      id: place + name + amount + moment(date).millisecond(),
      shipTo: place,
      name,
      amount: amount.toFixed(2),
      date: moment(date).format('DD MMMM, YYYY'),
      paymentMethod: 'VISA ⠀•••• 5919',
    };

    const orders = window.electron.store.get('orders') || [];
    orders.push(payload);
    window.electron.store.set('orders', orders);
    console.log(window.electron.store.get('orders'));
    // call ipc to main process
    setLoading(false);
    setDone(true);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <h1>New Order</h1>
            <FormGroup className={props.classes.root}>
              <TextField
                className={props.classes.textField}
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
              <TextField
                className={props.classes.textField}
                id="outlined-select-currency"
                select
                label="Ship to"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              >
                {places.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                className={props.classes.textField}
                type={'number'}
                value={amount}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => setAmount(Number(e.target.value))}
                label="Sales Amount"
              ></TextField>
              <DateTimePicker
                value={date}
                onChange={(date) => {
                  if (date) setDate(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <Toolbar />
              <LoadingButton
                sx={{ background: 'purple' }}
                loading={loading}
                style={{ width: '150px' }}
                variant="contained"
                loadingPosition="start"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                Save
              </LoadingButton>
              <Snackbar
                open={done}
                autoHideDuration={3000}
                onClose={() => setDone(false)}
              >
                <Alert severity="success">New Order is Saved</Alert>
              </Snackbar>
            </FormGroup>
          </Card>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default withStyles(styles)(GetOrders);
