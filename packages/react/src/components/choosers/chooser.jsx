import React from 'react';
import styled from 'styled-components';
import ChooseRadio from './controls/choose-radio';

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

const Chooser = ({ inColumns, groupName, options, skippable }) => {
    const chooserOptions = options.map((option, i) => (
        <ChooseRadio
            groupName={groupName}
            id={`${groupName}_${i}`}
            value={option.value}
        >
            {option.label}
        </ChooseRadio>
    ));

    const skipButton = (skippable && (
        <Skip>
            <ChooseRadio
                groupName={groupName}
                id={`${groupName}_skip`}
                value="skip"
            >
                Préfère ne pas répondre
            </ChooseRadio>
        </Skip>
    ));

    return (
        <>
            <Grid inColumns={inColumns}>
                {chooserOptions}
            </Grid>

            {skipButton}
        </>
    );
};

export default Chooser;
