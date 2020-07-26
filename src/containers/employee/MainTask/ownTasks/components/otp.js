import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
 
export default class OTP extends Component {
  constructor(props){
    super(props);
    this.state={
      verificationNumer:"",
      resendCode:false,
    }
  }
  
  render() {
    return (
      <div id="otpBox" className="otpBox" style={{justifyContent:"center"}}>
        <OtpInput
          // onChange={otp => console.log(otp)}
          onChange={otp =>this.props.getValuesInOtp(otp)} 
          // onBlur={(otp)=>{
          //   this.props.checkNumberVerified(otp)
          // }}
          numInputs={this.props.inputs}
          separator={<span>-</span>}
        />
      </div>
    );
  }
}