import React, { Component } from 'react';
import styled from 'styled-components';

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

        /* If the button got an `skippable` prop */
        /* it's become a skip button */
        const skip = chooseRadiosArray.filter(child =>
            child.props.skippable && child);

        /* Then return the skip button */
        const skipButton = (skip.length !== 0 && <Skip>{skip}</Skip>);

        /*  And return the array with the non-skip ones */
        const chooseRadios = chooseRadiosArray.filter(child => child !== skip[0] && child);

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
