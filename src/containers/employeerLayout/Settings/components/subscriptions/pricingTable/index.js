import React, { Component } from "react";

// import IntlMessages from "util/IntlMessages";
// import Card/Box from "components/CardBox";
// import ContainerHeader from "components/ContainerHeader";
import Basic from "./Basic";
import Standard from "./Standard";

class PricingTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: ""
    };
  }

  render() {
    const { price } = this.props;

    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="row" style={{ justifyContent: "center" }}>
          {/* <CardBox
            styleName="col-lg-12"
            cardStyle="p-0 no-shadow bg-transparent"
          > */}
          {price == "Basic" ? <Basic /> : <Standard />}
          {/* </CardBox> */}
        </div>
      </div>
    );
  }
}

export default PricingTable;
