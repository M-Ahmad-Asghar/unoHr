import React from "react";

const PriceItem = ({ styleName, headerStyle, itemStyle, footerStyle }) => {
  return (
    <div className={`${styleName}`}>
      <div className={`${headerStyle}`}>
        <span className="price">
          <i className="zmdi zmdi-money" />
          $39
        </span>
        <h4 className="letter-spacing-base text-uppercase mb-0">Basic</h4>
      </div>

      <ul className={`package-items ${itemStyle}`} style={{paddingBottom: "0px"}}>
        <li>
          <i className="zmdi zmdi-translate zmdi-hc-fw" />
          <span>1 Active Employee</span>
        </li>
        <li>
          <i className="zmdi zmdi-assignment-check" />
          <span>Task Manager</span>
        </li>
        <li>
          <i className="zmdi zmdi zmdi-time" />
          <span>Time Tracking</span>
        </li>
        <li>
          <i className="zmdi zmdi-mail-send zmdi-hc-fw" />
          <span>OnBoarding</span>
        </li>
        <li>
          <i className="zmdi zmdi-smartphone-iphone" />
          <span>Mobile (IOS + Android)</span>
        </li>
      </ul>
    </div>
  );
};

export default PriceItem;
