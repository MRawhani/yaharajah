import React from "react";

export default ({ rentals }) => {
  return (
    <div className="rental-assets">
      <h3 className="title">مواصفات</h3>
      <div className="row">
        {rentals.assets.map((r, i) => (
          <div className="col-md-6" key={i}>
            <span>
              <i className="fa fa-desktop"></i> {r}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
