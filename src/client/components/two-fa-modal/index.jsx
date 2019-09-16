import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Form from '~/components/form';
import Error from '~/components/error';
import { setFormValue } from '~/helpers';
import { states } from '~/constants';

// TODO: change to styles
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

class TwoFaModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      twoFaCode: '',
      isLoading: false,
      error: null,
    };

    this.setTwoFaCode = setFormValue('twoFaCode').bind(this);
  }

  submitCode = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const { twoFaCode } = this.state;
    const { onSubmit } = this.props;

    try {
      await onSubmit(twoFaCode);
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isShown, onClose } = this.props;
    const { twoFaCode, error, isLoading } = this.state;
    const classes = useStyles();

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isShown}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isShown}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transiton-group animates me.</p>

            <Form onSubmit={this.submitSigninAsync}>
              <Error error={error} />
              <Input
                key="email"
                value={twoFaCode}
                onChange={this.setTwoFaCode}
                required
                placeholder="Two factor authentication code"
                type="text"
              />

              <div className={styles.submit}>
                <Button
                  className={styles.signin}
                  type="submit"
                  primary
                  isLoading={isLoading}
                  state={states.blue}
                >
                  Let me in
                </Button>
              </div>
            </Form>
          </div>
        </Fade>
      </Modal>
    );
  }
}

TwoFaModal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

TwoFaModal.defaultProps = {
  onClose: () => {},
};


export default TwoFaModal;
