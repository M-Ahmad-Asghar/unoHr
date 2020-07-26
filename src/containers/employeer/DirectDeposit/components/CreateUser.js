import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import { createPersonalUser, saveFundingSource } from '../../../../redux/actions/directDepositAction';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from 'moment';

let cities = require('../../../../cities/cities.json');
let states = require('../../../../cities/states.json');

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    button: {
        height: 40,
        width: 120,
        backgroundColor: 'blue', 
        color: 'white',
        marginTop: 15,
        border: 'none'
    }
});

class CreateUser extends React.Component {
    state = {
        cities: [],
        labelWidth: 10,
        loader: false,

        firstName: '',
        lastName: '',
        email: '',
        address1: '',
        city: '',
        state: '',
        postalCode: '',
        dateOfBirth: '',
        ssn: '',
        docid: ''
    };

    componentWillMount() {
        let user = this.props.user;
        if(user) {
            let city = cities.filter(c => c.state === user.state )
            city = city.map(c => c.city);

            let state = states.filter(s => s.name === user.state )
            state = state.map(s => s.abbreviation);
            this.setState({
                cities: city,
                states: state,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address1: user.address.substring(0, 50),
                state: user.state,
                docid: user.docid
            })
        }
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
          });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.createPersonalUserStatus === 'done') {
            this.setState({
                loader: false
            })
            this.props.getPersonalUserURL(this.props.user.docid);
        } 

        if(nextProps.createPersonalUserStatus === "error") {
            this.setState({
                loader: false
            })
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        
        let { firstName, lastName, email, address1, city, state, postalCode, dateOfBirth, ssn, docid } = this.state;
        
        let data ={
            firstName,
            lastName,
            email,
            address1,
            city,
            state: 'CA',
            postalCode,
            dateOfBirth: moment(dateOfBirth).format('YYYY-MM-DD'),
            ssn,
            docid
        }
        
        console.log(data)
        if(firstName === '' || lastName === '' || email === '' || address1 === '' || city === '' || state === '' || 
            postalCode === '' || dateOfBirth === '' || ssn === '' || docid === '') {
                toast.error("No empty field allowed!");
        } else {
            
            this.props.createPersonalUser(data);
            this.setState({
                loader: true
            })
        }
    }

    render() {
        const { classes } = this.props;
        let { loader, cities } = this.state;

        return (
                loader ? 

                    <div style = {{ marginTop: "35px", textAlign: "center" }}>
                        <CircularProgress />
                    </div>
                :    
                    <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                        <h3 style={{ marginBottom: 15 }}>Create Account</h3>
                        <TextField
                            id="outlined-full-width"
                            label="First Name"
                            style={{ margin: 8 }}
                            placeholder="Enter your NIC First Name"
                            value={this.state.firstName}
                            onChange={this.handleChange('firstName')}
                            name='firstName'
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-full-width"
                            label="Last Name"
                            style={{ margin: 8 }}
                            placeholder="Enter your NIC Last Name"
                            value={this.state.lastName}
                            onChange={this.handleChange('lastName')}
                            name='lastName'
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-native-simple"
                            >

                            </InputLabel>
                            <Select
                                fullwidth
                                native
                                value={this.state.city}
                                onChange={this.handleChange('city')}
                                input={
                                    <OutlinedInput
                                        fullwidth
                                        name="city"
                                        labelWidth={this.state.labelWidth}
                                        id="outlined-age-native-simple"
                                    />
                                }
                            >
                                {cities.length > 0 ? (
                                    <React.Fragment>
                                        <option value="">Select Your City</option>
                                        {cities.map(city =>
                                            (<option value={city}>{city}</option>)
                                        )}
                                    </React.Fragment>
                                )
                                    :
                                    <option value="">No City Found</option>
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            id="outlined-full-width"
                            label="Postal Code"
                            style={{ margin: 8 }}
                            placeholder="Enter your Postal Code"
                            value={this.state.postalCode}
                            onChange={this.handleChange('postalCode')}
                            name='postalCode'
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-full-width"
                            label="Date of Birth"
                            style={{ margin: 8 }}
                            placeholder="Enter your Date of Birth"
                            value={this.state.dateOfBirth}
                            onChange={this.handleChange('dateOfBirth')}
                            name='dateOfBirth'
                            fullWidth
                            type='date'
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="outlined-full-width"
                            label="SSN"
                            style={{ margin: 8 }}
                            placeholder="Enter your Social Security Number"
                            value={this.state.ssn}
                            onChange={this.handleChange('ssn')}
                            name='ssn'
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <button className={classes.button} >Create Account</button>
                    </form>
        );
    }
}

CreateUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => {
    return {
        user: store.userReducer.user,
        createPersonalUserStatus: store.directDepositReducer.createPersonalUserStatus
    }
}

export default connect(mapStateToProps, { createPersonalUser, saveFundingSource })(withStyles(styles)(CreateUser));