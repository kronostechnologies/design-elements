import React, { Fragment } from "react";

// Components
import Bar from "./bar/bar";

const style = {
  fontSize: '0.875rem'
};

const progress_bar = props => {
  return (
    <React.Fragment>
      <label style={style} >{props.label}</label>
      <Bar 
        percent={props.percent}
        color={props.color}
        numbers={props.numbers}
      />
    </React.Fragment>
  );
};

export default progress_bar;
