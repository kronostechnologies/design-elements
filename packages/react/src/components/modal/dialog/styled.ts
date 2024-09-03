import styled from 'styled-components';
import { Button } from '../../buttons/button';
import { Heading } from '../../heading/heading';
import { Icon } from '../../icon/icon';
import { MobileDeviceContextProps } from '../types';
import { DialogType } from './types';

export const Subtitle = styled(Heading)`
`;

export const ButtonContainer = styled.div<MobileDeviceContextProps>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'unset')};
    gap: var(--spacing-1x);
    justify-content: flex-end;
`;

export const ConfirmButton = styled(Button)`
`;

export const CancelButton = styled(Button)`
`;

export const TitleIcon = styled(Icon)<{ $dialogType: DialogType }>`
    ${({ $dialogType, theme }) => ($dialogType === 'alert' ? `color: ${theme.component['modal-dialog-alert-icon-color']}` : '')};
`;

const HeadingWrapper = styled.div`
    position: relative;
`;

export const StyledHeadingWrapperComponent = styled(HeadingWrapper)`
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: var(--spacing-1halfx);
`;
