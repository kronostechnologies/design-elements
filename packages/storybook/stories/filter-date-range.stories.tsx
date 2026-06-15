import {
    FilterDateRange,
    type FilterDateRangePreset,
    FilterDateRangePresets,
    type FilterDateRangeValue,
} from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { useTranslation } from '../core/i18n';

const meta: Meta<typeof FilterDateRange> = {
    title: 'Components/FilterDateRange',
    component: FilterDateRange,
};

export default meta;

type Story = StoryObj<typeof FilterDateRange>;

export const Default: Story = {
    render: (args) => {
        const { t } = useTranslation('filterDateRange');
        const [value, setValue] = useState<FilterDateRangeValue>({
            from: new Date(2024, 11, 17),
            to: new Date(2025, 0, 9),
        });

        return (
            <FilterDateRange
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                label={t('label')}
                onChange={(newValue) => {
                    console.info(newValue);
                    setValue(newValue);
                }}
                value={value}
            />
        );
    },
};

export const PastPresets: Story = {
    render: (args) => {
        const { t } = useTranslation('filterDateRange');
        const [value, setValue] = useState<FilterDateRangeValue>({
            from: new Date(2024, 11, 17),
            to: new Date(2025, 0, 9),
        });
        const presets: FilterDateRangePreset[] = useMemo(() => (
            [
                FilterDateRangePresets.today(),
                FilterDateRangePresets.yesterday(),
                FilterDateRangePresets.past(),
                FilterDateRangePresets.lastDays(1),
                FilterDateRangePresets.lastDays(2),
                FilterDateRangePresets.lastWeeks(1),
                FilterDateRangePresets.lastWeeks(2),
                FilterDateRangePresets.lastMonths(1),
                FilterDateRangePresets.lastMonths(6),
                FilterDateRangePresets.lastYear(),
                FilterDateRangePresets.lastYears(2),
            ]
        ), []);

        return (
            <FilterDateRange
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                label={t('pastLabel')}
                onChange={(newValue) => {
                    console.info(newValue);
                    setValue(newValue);
                }}
                presets={presets}
                value={value}
            />
        );
    },
};

export const UpcomingPresets: Story = {
    render: (args) => {
        const { t } = useTranslation('filterDateRange');
        const [value, setValue] = useState<FilterDateRangeValue>({
            from: new Date(2024, 11, 17),
            to: new Date(2025, 0, 9),
        });
        const presets: FilterDateRangePreset[] = useMemo(() => (
            [
                FilterDateRangePresets.today(),
                FilterDateRangePresets.tomorrow(),
                FilterDateRangePresets.upcoming(),
                FilterDateRangePresets.nextDays(1),
                FilterDateRangePresets.nextDays(2),
                FilterDateRangePresets.nextWeeks(1),
                FilterDateRangePresets.nextWeeks(2),
                FilterDateRangePresets.nextMonths(1),
                FilterDateRangePresets.nextMonths(6),
                FilterDateRangePresets.nextYear(),
                FilterDateRangePresets.nextYears(2),
            ]
        ), []);

        return (
            <FilterDateRange
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                label={t('upcomingLabel')}
                onChange={(newValue) => {
                    console.info(newValue);
                    setValue(newValue);
                }}
                presets={presets}
                value={value}
            />
        );
    },
};
