import Axios from 'axios';
import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import * as queryString from 'query-string';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import AlertTitle from '@material-ui/lab/AlertTitle/AlertTitle';
import useStyles from './style';
import { isInputEmpty } from '../../utils/formUtils';

const tokenErrorMsg = () => (
  <>
    Token is expired or your email does not exist.
    <br />
    Please send reset email agian by click &nbsp;
    <Link to="/reset_password">Reset Password</Link>
  </>
);

const resetErrorMsg = () => (
  <>
    Failed to Reset Password. Please retry later
  </>
);

export default (props: any) => {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isVerifyFinished, setIsVerifyFinished] = useState(false);
  const { location, history } = props;
  const querys = queryString.parse(location.search);
  const { sid, email } = querys;
  const doReset = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isInputEmpty(password) && password === cpassword) {
      try {
        const res = await Axios.put('/user-service/password', { email, password });
        const { data } = res;
        if (data.code >= 0) {
          setMessage('success');
          setTimeout(() => {
            history.push('/login');
          }, 10000);
        } else {
          setMessage('reset');
        }
      } catch (e) {
        setMessage('reset');
      }
    }
    setIsVerifyFinished(true);
  };
  useEffect(() => {
    if (!isVerifyFinished) {
      Axios.post('/user-service/reset/verify', {
        token: sid,
        email,
      }).then((res) => {
        const { data } = res;
        const { code } = data;
        if (code < 0) {
          setMessage('token');
        }
      }).catch(() => {
        setMessage('token');
      });
    }
  }, [isVerifyFinished]);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h5" component="h2" className={classes.title}>
          Update Password
        </Typography>
        {
          message === '' ? (
            <Card className={classes.card}>
              <form noValidate onSubmit={doReset}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        error={isInputEmpty(password)}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: '10px' }}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="cpassword"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.currentTarget.value)}
                        error={password !== cpassword}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" type="submit">
                    Reset
                  </Button>
                </CardActions>
              </form>
            </Card>
          ) : (
            <>
              {
                message === 'success' ? (
                  <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Reset password successfully. Redirect to &nbsp;
                    <Link to="/login">Login Page</Link>
                    &nbsp; in 10 seconds...
                  </Alert>
                ) : (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {
                      message === 'reset' ? resetErrorMsg() : tokenErrorMsg()
                    }
                  </Alert>
                )
              }
            </>
          )
        }
      </Container>
    </>
  );
};
