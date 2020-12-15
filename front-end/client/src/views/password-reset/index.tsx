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
import { useState } from 'react';
import ReportIcon from '@material-ui/icons/Report';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Link } from 'react-router-dom';
import useStyles from './style';
import { isInputEmpty, validateEmail } from '../../utils/formUtils';

export default () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const isEmailValid = () => validateEmail(email) && !isInputEmpty(email);
  const doReset = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isEmailValid()) {
      try {
        await Axios.get(`/user-service/reset/${email}`);
        setResetStatus('success');
      } catch (e) {
        setResetStatus('failed');
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h5" component="h2" className={classes.title}>
          Reset Password
        </Typography>
        <Card className={classes.card}>
          {
            resetStatus === '' ? (
              <form noValidate onSubmit={doReset}>
                <Typography variant="body1">
                  Lost your password? Please enter your email address.
                  You will receive a link to create a new password via email.
                </Typography>
                <CardContent>
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
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" type="submit">
                    Reset
                  </Button>
                </CardActions>
              </form>
            ) : (
              <div className={classes.resetStatus}>
                <div>
                  {
                    resetStatus === 'success'
                      ? <CheckCircleIcon className={classes.successIcon} />
                      : <ReportIcon className={classes.errorIcon} />
                  }
                </div>
                <div className={classes.statusContent}>
                  <Typography variant="body1" className={classes.statusContentText}>
                    {
                      resetStatus === 'success'
                        ? (
                          <span>
                            {`Reset Email has been sent to email ${email} successfully`}
                          </span>
                        )
                        : (
                          <span>
                            Failed to send password reset email
                          </span>
                        )
                    }
                  </Typography>
                  <Link to="/login" className={classes.goBackLink}>
                    Go back to login
                  </Link>
                </div>
              </div>
            )
          }
        </Card>
      </Container>
    </>
  );
};
