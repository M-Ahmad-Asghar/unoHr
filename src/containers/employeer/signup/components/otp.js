import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
 
export default class OTP extends Component {
  render() {
    return (
      <div id="otpBox" className="otpBox" style={{justifyContent:"center"}}>
        <OtpInput
          // onChange={otp => console.log(otp)}
          onChange={otp =>this.props.getValuesInOtp(otp)}
          numInputs={this.props.inputs}
          separator={<span>-</span>}
        />
      </div>
    );
  }
}