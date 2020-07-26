import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import BasicTable from './components/BasicTable';
import { connect } from 'react-redux';
import { getWcStates } from '../../../redux/actions/wcStateAction';
import CircularProgress from "@material-ui/core/CircularProgress";

class StateContact extends Component {
    state={
        wcStates: [], 
        loader: true
    }

    componentDidMount() {
        this.props.getWcStates();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.getWCStatesStatus === 'done') {
            this.setState({
                wcStates: nextProps.wcStates,
                loader: false
            })
        }

        if(nextProps.getWCStatesStatus === 'error') {
            this.setState({
                loader: false
            })
        }
    }

  render() {
      let { loader, wcStates } = this.state;
      wcStates = wcStates.filter(s => s.state === this.props.user.state);

    return(
      <Container>
          { loader ? 
            <div style={{ marginTop: "35px", textAlign: "center" }}>
                <CircularProgress />
            </div>
        :
        <Row>
          <BasicTable wcState={wcStates[0]} />
        </Row>
         }
      </Container>
    );
  }
}

StateContact.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapState = (state) => {
    return {
        wcStates: state.wcStateReducer.wcStates,
        getWCStatesStatus: state.wcStateReducer.getWCStatesStatus,
        loader: state.wcStateReducer.loader,
        user: state.userReducer.user,
    }
}

export default connect(mapState, { getWcStates })(translate('common')(StateContact));