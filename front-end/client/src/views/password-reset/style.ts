import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
  },
  card: {
    width: '100%',
    padding: '16px',
  },
  title: {
    margin: '50px 0 10px 0',
  },
  emailInput: {
    width: '100%',
  },
  successIcon: {
    color: '#24A546',
    fontSize: '50px',
  },
  resetStatus: {
    display: 'flex',
  },
  statusContent: {
    paddingLeft: '1em',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100px',
  },
  statusContentText: {
    flex: 1,
  },
  errorIcon: {
    color: '#D84142',
    fontSize: '50px',
  },
  goBackLink: {
    display: 'block',
    float: 'right',
  },
}));
