import React from "react";

// Components
import Bar from "./bar/bar";

const style = {
  fontSize: '0.875rem'
};

const progress_bar = props => {
  return (
    <div>
      <label style={style} >{props.label}</label>
      <Bar 
        percent={props.percent}
        color={props.color}
        numbers={props.numbers}
      />
    </div>
  );
};

export default progress_bar;
