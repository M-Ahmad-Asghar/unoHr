import React from 'react';
import { Grid } from "@material-ui/core";

const Footer = () => {
    return (
        <div className='footer-wrapper'>
            <Grid container className="wrapper footer-container">
                <Grid item sm={12} lg={9}>
                    <p>
                    © 2020 WorkScaler, inc. unoHR is a service of Workscaler, Inc.
                    </p>
                </Grid>

                <Grid item sm={12} lg={3}>
                    <div className="terms-privacy">
                        <div>
                            <a href="#">Privacy Policy</a>
                        </div>
                        <div className="">
                            <a href="#">Terms & conditions</a>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Footer;