import { FieldsetHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

type LegendSize = 'small' | 'medium' | 'large';

export interface LegendProps extends HTMLAttributes<HTMLLegendElement> {
    className?: string;
    size?: LegendSize;
    bold?: boolean;
    text: string;
    disabled?: boolean;
}

type FieldsetOrientation = 'horizontal' | 'vertical';

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
    legend?: LegendProps;
    orientation?: FieldsetOrientation;
    children: ReactNode;
}
