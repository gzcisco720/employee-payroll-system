import * as React from 'react';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useHistory, Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from './style';
import Copyright from '../../components/copy-right';
import { isInputEmpty, validateEmail, handleChange } from '../../utils/formUtils';

export default function SignUp() {
  const classes = useStyles();
  const state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cpassword: '',
  };
  const [form, setFormData] = useState(state);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const valid = {
    firstName: !isInputEmpty(form.firstName),
    lastName: !isInputEmpty(form.lastName),
    email: !isInputEmpty(form.email) && validateEmail(form.email),
    password: !isInputEmpty(form.password),
    cpassword: form.password === form.cpassword,
  };
  const history = useHistory();
  const isFormValid = (val: any) => {
    let isValid = true;
    Object.keys(val).forEach((key: string) => {
      if (val[key] === false) {
        isValid = false;
      }
    });
    return isValid;
  };
  const onFormChange = handleChange(setFormData);
  const onSignupClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowProgress(true);
    if (isFormValid(valid)) {
      const res = await Axios.post('/user-service/add', {
        email: form.email, password: form.password,
      });
      const { data } = res;
      if (data.code === 0) {
        history.push('/login');
      } else {
        setShowError(true);
        setErrorMsg(data.data);
      }
    }
    setShowProgress(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {showProgress && <LinearProgress className={classes.progress} />}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {
          showError && (
            <Alert severity="error">
              {errorMsg}
            </Alert>
          )
        }
        <form className={classes.form} noValidate onSubmit={onSignupClick}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={form.firstName}
                onChange={onFormChange}
                error={!valid.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={onFormChange}
                error={!valid.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={form.email}
                onChange={onFormChange}
                error={!valid.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={form.password}
                onChange={onFormChange}
                error={!valid.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                value={form.cpassword}
                onChange={onFormChange}
                error={!valid.cpassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login"> Already have an account? Sign in </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
