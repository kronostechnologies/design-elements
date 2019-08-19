import React from 'react';
import styled from 'styled-components';
import ChooseInput from './controls/choose-input';

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

const Chooser = ({ inColumns, groupName, onChange, options, skipValue, skipLabel }) => {
    const handleChange = value => {
        if (typeof onChange === 'function') {
            onChange(value);
        }
    };

    const chooserOptions = options.map((option, i) => (
        <ChooseInput
            groupName={groupName}
            id={`${groupName}_${i}`}
            onChange={value => handleChange(value)}
            type="radio"
            value={option.value}
        >
            {option.label}
        </ChooseInput>
    ));

    const skipButton = (skipValue && skipLabel && (
        <Skip>
            <ChooseInput
                groupName={groupName}
                id={`${groupName}_skip`}
                onChange={value => handleChange(value)}
                type="radio"
                value={skipValue}
            >
                {skipLabel}
            </ChooseInput>
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
