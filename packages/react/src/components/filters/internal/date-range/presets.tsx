import type { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../../../i18n/use-translation';
import { ListItem } from '../../../listbox/list-item';
import type { FilterDateRangePreset } from '../../filter-date-range';

const Container = styled.div`
    border-right: 1px solid ${({ theme }) => theme.component['filter-divider-color']};
    display: flex;
    grid-area: shortcuts;
    min-width: 186px;
    padding: var(--spacing-half) 0;
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    list-style-type: none;
    margin: 0;
    overflow-y: auto;
    padding: 0;
    width: 100%;
`;

export interface PresetsProps {
    onCustomPresetClick(): void;

    onPresetClick(preset: FilterDateRangePreset | null): void;

    presets: FilterDateRangePreset[];
    selectedPreset: string | null;
}

export const CUSTOM_PRESET = 'custom';

export const Presets: FC<PresetsProps> = ({
    onCustomPresetClick,
    onPresetClick,
    presets,
    selectedPreset,
}) => {
    const { t } = useTranslation('filter');

    return (
        <Container>
            <List>
                <ListItem
                    onClick={() => onPresetClick(null)}
                    $selected={selectedPreset === null}
                >
                    {t('all')}
                </ListItem>

                {presets.map((preset) => (
                    <ListItem
                        key={preset.label}
                        onClick={() => onPresetClick(preset)}
                        $selected={selectedPreset === preset.label}
                    >
                        {t(preset.label)}
                    </ListItem>
                ))}

                <ListItem
                    onClick={onCustomPresetClick}
                    $selected={selectedPreset === CUSTOM_PRESET}
                >
                    {t('custom')}
                </ListItem>
            </List>
        </Container>
    );
};

Presets.displayName = 'Presets';
