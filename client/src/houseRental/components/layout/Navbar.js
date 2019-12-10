import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { userLogout } from '../../../common/ducks/auth';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  homeTitle: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'white',
  },
  loginTitle: {
    textDecoration: 'none',
    color: 'white',
  },
}));

const Navbar = ({ isUserAuthenticated, userLogout }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          />
          <Link to="/" className={classes.homeTitle}>
            <Typography variant="h6">HomeRental</Typography>
          </Link>
          {isUserAuthenticated ? (
            <Link to="/" className={classes.loginTitle} onClick={userLogout}>
              <Typography variant="h6">Logout</Typography>
            </Link>
          ) : (
            <Link to="/login" className={classes.loginTitle}>
              <Typography variant="h6">Login</Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  userLogout: PropTypes.func,
  isUserAuthenticated: PropTypes.bool,
};

Navbar.defaultProps = {
  userLogout: () => {},
  isUserAuthenticated: '',
};

const mapStateToProps = state => ({
  isUserAuthenticated: state.default.isUserAuthenticated,
});

export default connect(mapStateToProps, { userLogout })(Navbar);
