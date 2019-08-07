import React from "react";
import styled from "styled-components";

const Item = styled.li`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0 0 15px;

  p {
    margin: 0;
    font-size: 0.875rem;
  }

  ::before {
    content: "•";
    font-size: 2.6em;
    color: ${props => props.color || 'rgb(101, 226, 255)'};
    font-weight: bold;
    width: 0.5em;
    margin: -0.4em 0 0 -0.5em;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0 1.2rem;
`;

const Description = styled.span`
  font-size: 0.75rem;
  color: rgb(87, 102, 110);
`;

const legend = props => {
  return (
    <List>
      {props.legend.map(lgd => (
        <Item color={lgd.color}>
          <div>
            <p>{lgd.name}</p>
            <Description>{lgd.description}</Description>
          </div>
        </Item>
      ))}
    </List>
  );
};

export default legend;
