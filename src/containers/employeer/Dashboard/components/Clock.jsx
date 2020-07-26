import React from 'react';
import { Table } from 'reactstrap';
import Panel from '../../../../shared/components/Panel';

const TopTen = ({ data, t }) => (
  <Panel lg={12} title="Clock">
    <Table responsive className="table--bordered dashboard__table-crypto">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Activity</th>
        </tr>
      </thead>
      <tbody>
        {
          data.length > 0 ?
            data.map((stmnt, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{stmnt.name}</td>
                <td>{stmnt.statement}</td>
              </tr>
            ))
          :
              <th style={{textAlign: 'end', paddingTop: 15}}>No activity found!</th>
        }
      </tbody>
    </Table>
  </Panel>
);

export default TopTen;
