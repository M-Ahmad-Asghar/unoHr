import React from "react";
import ItemThird from "../ItemThird";

const Standard = () => {
  return (
    <div className="price-tables row pt-default d-flex justify-content-around">
      <div className="col-md-12 px-lg-12">
        <ItemThird
          styleName="card package bg-white shadow"
          headerStyle="package-header lighten-1 text-white"
          itemStyle="package-items text-grey text-darken-3"
          footerStyle="btn btn-default bg-primary lighten-1 text-white"
        />
      </div>
    </div>
  );
};

export default Standard;
