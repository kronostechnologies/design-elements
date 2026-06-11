import {
    FilterDateRange,
    type FilterDateRangePreset,
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
        const presets: FilterDateRangePreset[] = useMemo(() => {
            const today = new Date();
            return (
                [
                    { endRelative: { days: 0 }, label: t('today'), startRelative: { days: 0 } },
                    { endRelative: { days: -1 }, label: t('past') },
                    { start: today, label: t('upcoming') },
                    { endRelative: { days: 0 }, label: t('lastSixMonths'), startRelative: { months: -6 } },
                    {
                        end: new Date(today.getFullYear() - 1, 11, 31),
                        label: t('lastYear', { year: today.getFullYear() - 1 }),
                        start: new Date(today.getFullYear() - 1, 0, 1),
                    },
                ]
            );
        }, [t]);

        return (
            <FilterDateRange
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                label={t('label')}
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
