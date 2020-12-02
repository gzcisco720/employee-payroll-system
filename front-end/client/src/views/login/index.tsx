import Axios from 'axios';
import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import Copyright from '../../components/copy-right';
import useStyles from './style';
import { validateEmail, isInputEmpty } from '../../utils/formUtils';

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const storedUser = JSON.parse((localStorage.getItem('user') as any));

  const [email, setEmail] = useState(storedUser ? storedUser.email : '');
  const [password, setPassword] = useState(storedUser ? storedUser.password : '');
  const [isLoginFailed, setLoginFailed] = useState(false);
  const [rememberMe, setRememberMe] = useState(storedUser !== null);
  const [showProgress, setShowProgress] = useState(false);

  const isEmailValid = () => validateEmail(email) && !isInputEmpty(email);

  const doLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowProgress(true);
    if (isEmailValid() || !isInputEmpty(password)) {
      try {
        const res = await Axios.post('/login', { email, password });
        const { data } = res;
        if (data.code === 0) {
          if (rememberMe) {
            localStorage.setItem('user', JSON.stringify({ email, password }));
          }
          localStorage.setItem('token', data.data);
          history.push('/app/main');
        } else {
          setLoginFailed(true);
        }
      } catch (e) {
        setLoginFailed(true);
      }
    }
    setShowProgress(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      {
        showProgress && <LinearProgress className={classes.progress} />
      }
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={doLogin}>
            {
              isLoginFailed && (
                <Alert severity="error">
                  Login failed! Please check your login email and password.
                </Alert>
              )
            }
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              error={!isEmailValid()}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              error={isInputEmpty(password)}
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={rememberMe}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.checked) {
                      localStorage.removeItem('user');
                    }
                    setRememberMe(e.target.checked);
                  }}
                  color="primary"
                />
              )}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
