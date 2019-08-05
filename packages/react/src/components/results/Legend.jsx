import React from "react";
import styled from "styled-components";

const Item = styled.li`
  list-style: none;
  display: flex;
  margin: 15px 0;

  & p{
      margin: 0;
  }

  ::before {
    content: "•";
    font-size: 2.8em;
    color: ${props => props.color || "#27A7C9"};
    font-weight: bold;
    display: inline;
    width: 0.5em;
    margin-left: -0.5em;
    margin-top: -0.4em;
  }
`;

const Description = styled.span`
  font-size: 0.9em;
  color: gray;
`;

const legend = props => {
  
    // Variable de test
  const legend = [
    {
      name: "Vous",
      description: "Données provenants de vos réponses"
    },
    {
      name: "Pairs d'Equisoft",
      description: "Données privée d'Equisoft",
      color: "#000014"
    },
    {
      name: "Pairs Général",
      description: "Données publiques accessible à tous",
      color: "#304E63"
    }
  ];

  return (
    <ul>
      {legend.map(lgd => (
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
