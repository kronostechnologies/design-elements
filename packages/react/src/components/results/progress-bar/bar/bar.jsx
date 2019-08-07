import React from 'react';
import styled from "styled-components";

const Container = styled.div `
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    p {
        margin: 0;
        width: 8.5rem;
        text-align: right;
        color: ${props => props.main ? "#000000" : "#57666e"};
    }
`;

const Progress = styled.div `
    width: 100%;
    background-color: #dcdcdc;
    border-radius: 4rem;
    height: 0.55rem;
`;

const Bar = styled.div `
    width: ${props => props.percent}%;
    height: 0.55rem;
    background: linear-gradient(to right, rgb(0, 0, 0, 0.7), ${props => props.color || "#63E0FD"} 40%);
    border-radius: 4rem;
`;

const bar = props => {
    return(
        <Container main={props.main}>
            <Progress>
                <Bar color={props.color} percent={props.percent} />
            </Progress>
            <p>{props.numbers}</p>
        </Container>
    )
}

export default bar;