import { FieldsetHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type LegendSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large';

export interface LegendProps extends HTMLAttributes<HTMLLegendElement> {
    className?: string;
    size?: LegendSize;
    bold?: boolean;
}

type BaseFieldsetProps = Pick<FieldsetHTMLAttributes<HTMLFieldSetElement>,
    'disabled' | 'id' | 'aria-disabled' | 'aria-label'
>;

export interface FieldsetProps extends BaseFieldsetProps {
    legend: Omit<LegendProps, 'children'> & { text: string };
    children: ReactNode;
}
