import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function OTP(props) {
  const [verificationNumer, setVerificationNumer] = useState("");
  const [resendCode, setResendCode] = useState(false);

  return (
    <div id="otpBox" className="otpBox" style={{ justifyContent: "center" }}>
      <OtpInput
        // onChange={otp => console.log(otp)}
        onChange={(otp) => props.getValuesInOtp(otp)}
        // onBlur={(otp)=>{
        //   this.props.checkNumberVerified(otp)
        // }}
        numInputs={props.inputs}
        separator={<span>-</span>}
      />
    </div>
  );
}
