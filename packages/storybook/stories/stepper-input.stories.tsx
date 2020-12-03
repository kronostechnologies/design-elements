import { StepperInput } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Stepper input',
    component: StepperInput,
}

export const normal = () => (
    <StepperInput label="Stepper input"/>
)

export const withDefaultValue = () => (
    <StepperInput label="Stepper input" defaultValue="0"/>
)

export const withCustomStep = () => (
    <StepperInput label="Stepper input" step="5"/>
)

export const withMaxValue = () => (
    <StepperInput label="Stepper input" max="5"/>
)

export const withMinValue = () => (
    <StepperInput label="Stepper input" min="0"/>
)

export const invalid = () => (
    <StepperInput valid={false} label="Stepper input"/>
)

export const disabled = () => (
    <StepperInput label="Stepper input" disabled/>
)

export const withOnChangeCallback = () => (
    <StepperInput label="Stepper input" onChange={(event) => console.log(event.target.value)}/>
)
