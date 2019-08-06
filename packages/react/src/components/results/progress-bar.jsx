import React from 'react';
import styled from "styled-components";

const Bar = styled.div``;

const progress_bar = props => {
    return (
        <div>
            <label>Vous</label>
            <div>
                <Bar />
                <p>60k-64k $</p>
            </div>
        </div>
    )
}

export default progress_bar;