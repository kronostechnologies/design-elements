import { FieldsetHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type LegendSize = 'small' | 'medium' | 'large';

export interface LegendProps extends HTMLAttributes<HTMLLegendElement> {
    className?: string;
    size?: LegendSize;
    bold?: boolean;
}

export type FieldsetOrientation = 'horizontal' | 'vertical';

type BaseFieldsetProps = Pick<FieldsetHTMLAttributes<HTMLFieldSetElement>,
    'disabled' | 'id' | 'aria-disabled' | 'aria-label' | 'role'
>;

export interface FieldsetProps extends BaseFieldsetProps {
    legend?: Omit<LegendProps, 'children'> & { text: string };
    orientation?: FieldsetOrientation;
    children: ReactNode;
}
