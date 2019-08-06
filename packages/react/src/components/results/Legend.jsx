import React from "react";
import styled from "styled-components";

const Item = styled.li`
  list-style: none;
  display: flex;
  margin: 15px 0;

  p {
    margin: 0;
    font-size: 0.875rem;
  }

  ::before {
    content: "•";
    font-size: 2.6em;
    color: ${props => props.color || "#65e2ff"};
    font-weight: bold;
    width: 0.5em;
    margin: -0.4em 0 0 -0.5em;
  }
`;

const Description = styled.span`
  font-size: 0.75rem;
  color: gray;
`;

const legend = props => {
  return (
    <ul>
      {props.legend.map(lgd => (
        <Item color={lgd.color}>
          <div>
            <p>{lgd.name}</p>
            <Description>{lgd.description}</Description>
          </div>
        </Item>
      ))}
    </ul>
  );
};

export default legend;
