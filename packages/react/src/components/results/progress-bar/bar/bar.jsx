import React from 'react';
import styled from "styled-components";

const Container = styled.div `
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    p {
        margin: 0;
        width: 130px;
        text-align: right;
    }
`;

const Progress = styled.div `
    width: 100%;
    background-color: #dcdcdc;
    border-radius: 4px;
    height: 8px;
`;

const Bar = styled.div `
    width: ${props => props.percent}%;
    height: 8px;
    background: linear-gradient(to right, rgb(0, 0, 0, 0.7), ${props => props.color || "#63E0FD"} 40%);
    border-radius: 4px;
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