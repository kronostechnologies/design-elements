import { FieldsetHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type LegendSize = 'small' | 'medium' | 'large';

export interface LegendProps extends HTMLAttributes<HTMLLegendElement> {
    className?: string;
    size?: LegendSize;
    bold?: boolean;
    disabled?: boolean;
}

export type FieldsetOrientation = 'horizontal' | 'vertical';

type BaseFieldsetProps = Pick<FieldsetHTMLAttributes<HTMLFieldSetElement>,
    'disabled' | 'id' | 'aria-disabled' | 'aria-orientation' | 'aria-label'
>;

export interface FieldsetProps extends BaseFieldsetProps {
    legend?: LegendProps;
    orientation?: FieldsetOrientation;
    children: ReactNode;
}
