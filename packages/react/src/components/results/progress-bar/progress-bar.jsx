import React from "react";
import styled from "styled-components";

// Components
import Bar from "./bar/bar";

const Label = styled.label`
  font-size: 0.875rem;
  color: ${props => props.main ? "#000000" : "#57666e"};
`;

const progress_bar = props => {
  return (
    <div>
      <Label main={props.main} >{props.label}</Label>
      <Bar 
        percent={props.percent}
        color={props.color}
        numbers={props.numbers}
        main={props.main}
      />
    </div>
  );
};

export default progress_bar;
