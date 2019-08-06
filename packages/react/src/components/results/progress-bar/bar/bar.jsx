import React from 'react';
import styled from "styled-components";

const Container = styled.div `
    display: flex;
    align-items: center;
    p {
        margin: 0;
        flex-basis: 24%;
        text-align: right;
    }
`;

const Progress = styled.div `
    width: 100%;
    background-color: #dcdcdc;
    border-radius: 10px;
    height: 12px;
`;

const Bar = styled.div `
    width: ${props => props.percent};
    height: 12px;
    background-color: ${props => props.color || "#63E0FD"};
    border-radius: 10px;
`;

const bar = props => {
    return(
        <Container>
            <Progress>
                <Bar color={props.color} percent={props.percent} />
            </Progress>
            <p>{props.numbers}</p>
        </Container>
    )
}

export default bar;