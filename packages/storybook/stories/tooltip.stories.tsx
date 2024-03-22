import {
    GlobalHeader,
    IconButton,
    DropdownNavigation,
    NavListOption,
    DropdownList,
    Tooltip,
    TooltipPlacement,
    TextInput,
} from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { DesktopDecorator } from './utils/device-context-decorator';
import { rawCodeParameters } from './utils/parameters';
import { RouterDecorator } from './utils/router-decorator';

const Container = styled.div`
    height: 100px;
`;

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
};

const DarkDiv = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.main['primary-1.1']};
    display: flex;
    height: 50px;
    justify-content: center;
    width: 100%;
`;

export const Normal: Story = () => (
    <Tooltip label="Tooltip Content" />
);

export const DefaultOpen: Story = () => (
    <Tooltip defaultOpen label="Tooltip Content" />
);

export const Delayed: Story = () => (
    <Tooltip label="Tooltip Content" delayed />
);

export const InvertedIcon: Story = () => (
    <DarkDiv>
        <Tooltip label="Tooltip Content" invertedIcon desktopPlacement="left" />
    </DarkDiv>
);

export const WithChildElement: Story = () => (
    <Container>
        <Tooltip label="Go to settings page" desktopPlacement="bottom">
            <IconButton buttonType="primary" label="settings" iconName="settings" />
        </Tooltip>
    </Container>
);

const DesktopPlacementContainer = styled.div`
    height: 240px;
    max-width: 200px;
`;

const DesktopPlacementTooltip = styled(Tooltip)`
    margin-left: 120px;
`;

export const DesktopPlacement: Story = () => {
    const [placement, setPlacement] = useState<TooltipPlacement>('right');

    interface Placements {
        value: TooltipPlacement;
        label: TooltipPlacement;
    }
    const placements: Placements[] = [
        { value: 'top', label: 'top' },
        { value: 'right', label: 'right' },
        { value: 'bottom', label: 'bottom' },
        { value: 'left', label: 'left' },
    ];

    return (
        <DesktopPlacementContainer>
            <DropdownList
                defaultValue="right"
                label="Desktop placement"
                options={placements}
                onChange={(option) => setPlacement(option.value as TooltipPlacement)}
            />
            <DesktopPlacementTooltip desktopPlacement={placement} label="Tooltip Content" />
        </DesktopPlacementContainer>
    );
};
DesktopPlacement.decorators = [DesktopDecorator];
DesktopPlacement.parameters = rawCodeParameters;

const options: NavListOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
        isHtmlLink: true,
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
        isHtmlLink: true,
    },
];

export const WithDropdownNavigation: Story = () => {
    const [isDropdownexpanded, setDropdownExpanded] = useState(false);

    return (
        <Container>
            <GlobalHeader>
                <Tooltip label="Label" desktopPlacement="bottom" disabled={isDropdownexpanded} delayed>
                    <DropdownNavigation
                        iconOnly
                        iconName="info"
                        options={options}
                        onDropdownVisibilityChanged={setDropdownExpanded}
                    />
                </Tooltip>
            </GlobalHeader>
        </Container>
    );
};

WithDropdownNavigation.decorators = [RouterDecorator];

const CodeContainer = styled.div<{ justifyContent?: string }>`
    display: flex;
    justify-content: ${({ justifyContent }) => (justifyContent || 'flex-start')};
`;
export const WithConfirmation: Story = () => {
    const code = 'JBSW Y3DP EHPK 3PXP';

    return (
        <Container>
            <CodeContainer>
                <span>{code}</span>
                <Tooltip
                    label="label"
                    confirmationLabel="label confirmation"
                    desktopPlacement="bottom"
                    mode='confirm'
                >
                    <IconButton
                        buttonType='tertiary'
                        type='button'
                        iconName='copy'
                        onClick={() => {
                            navigator.clipboard.writeText(code);
                        }}
                    />
                </Tooltip>
            </CodeContainer>
        </Container>
    );
};

export const WithDynamicText: Story = () => {
    const [label, setLabel] = useState<string>('Hide password');
    const [iconName, setIconName] = useState<'eye' | 'eyeOff'>('eye');
    const [inputType, setInputType] = useState<string>('password');
    const [password, setPassword] = useState<string>('somePassword');
    const handleOnClick = useCallback(() => {
        if (label === 'Hide password') {
            setLabel('Show password in plain text');
            setIconName('eyeOff');
            setInputType('password');
        } else {
            setLabel('Hide password');
            setIconName('eye');
            setInputType('text');
        }
    }, [label, setLabel]);
    const handleOnPasswordChange = useCallback((newPassword) => {
        setPassword(newPassword);
    }, [setPassword]);

    return (
        <Container>
            <CodeContainer justifyContent='flex-end'>
                <TextInput
                    required
                    label="Password"
                    type={inputType}
                    value={password}
                    onChange={handleOnPasswordChange}
                    validationErrorMessage="This field is required"
                />
                <Tooltip
                    label={label}
                    desktopPlacement="top"
                    defaultOpen
                >
                    <IconButton
                        buttonType='primary'
                        onClick={handleOnClick}
                        iconName={iconName}
                    />
                </Tooltip>
            </CodeContainer>
        </Container>
    );
};
