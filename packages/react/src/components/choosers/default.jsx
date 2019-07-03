import React, { Component } from 'react';

import styled from 'styled-components';
import visuallyhidden from '../a11y/styles/visuallyhidden';

const Grid = styled.div`
  align-items: stretch;
  box-sizing: border-box;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: ${props => (props.inColumns ? 'repeat(auto-fit, minmax(8.75rem, 1fr))' : 'none')};
  width: auto;
`;

const Skip = styled.div`
  margin: 1rem 0 0;
`;

export default class Chooser extends Component {
    render() {
        const { children, inColumns } = this.props;
        const chooseRadiosArray = React.Children.toArray(children);

        /* If the last button got an empty value attribute */
        /* it's become a skip button */
        const skip = chooseRadiosArray.filter((child, index, array) => {
            if (child === array.slice(-1)[0]
                && child.props.value === "") return child;
        });

        /* Then return the skip button */
        const skipButton = (skip.length !== 0 && <Skip>{skip}</Skip>);

        /*  And return the array with the non-skip ones */
        const chooseRadios = chooseRadiosArray.filter(child => {
            return child !== skip[0] && child;
        });

        return (
            <>
                <Grid inColumns={inColumns}>
                    {chooseRadios}
                </Grid>

                {skipButton}
            </>
        );
    }
}
