import styled from 'styled-components';
import { Icon } from '../../icon';
import type { MobileDeviceContextProps } from '../types';
import type { DialogType } from './modal-dialog';

export const ButtonContainer = styled.div<MobileDeviceContextProps>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'unset')};
    gap: var(--spacing-1x);
    justify-content: flex-end;
`;

export const TitleIcon = styled(Icon)<{ $dialogType: DialogType }>`
    color: ${({ $dialogType, theme }) => ($dialogType === 'alert' ? theme.component['modal-dialog-alert-icon-color'] : null)};
`;

export const StyledHeadingWrapperComponent = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: var(--spacing-1halfx);
    position: relative;
`;
