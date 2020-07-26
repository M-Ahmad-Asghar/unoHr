import React from 'react';
import Panel from '../../../../shared/components/Panel';
import { Typography } from '@material-ui/core';
import moment from 'moment';

let d = new Date();

const Payroll = ({ data }) => (
  <Panel
    xl={6}
    lg={6}
    md={12}
    xs={12}
    title="Payroll Data"
    subhead="Information about last and next payrol"
    style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
  >
    <div style={{display: 'flex', marginTop: 60, flexDirection: 'row', justifyContent: 'space-between'}}>
      <div>
        <Typography><b>Last Payroll Amount</b></Typography>
        { data.length > 0 ?
            <Typography>$ {data[0].pay}</Typography>
          :
            <Typography>$ 0</Typography>
        }  
      </div>
      <div>
        <Typography><b>Next Payroll Date</b></Typography>
        { data.length > 0 ?
            <Typography>{moment(d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7)).format('MMM DD, YYYY')}</Typography>
            :
            <Typography>N/A</Typography>
        }
      </div>
      <div>
        <Typography><b>Last Payroll Date</b></Typography>
        { data.length > 0 ?
            <Typography>{moment(data[0].createdAt).format('MMM DD, YYYY')}</Typography>
            :
            <Typography>N/A</Typography>
        }
      </div>
    </div>
  </Panel>
);

export default Payroll;
