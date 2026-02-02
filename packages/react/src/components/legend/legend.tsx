import { useEffect, VoidFunctionComponent } from 'react';
import styled from 'styled-components';

const List = styled.ul`
    margin: 0;
    padding: 0;
`;

export interface LegendItem {
    name: string;
    description: string;
    color?: string;
}

const Item = styled.li<Pick<LegendItem, 'color'>>`
    align-items: baseline;
    display: flex;
    list-style: none;
    margin: 0 0 var(--spacing-1x);
    padding: 0;

    p {
        font-size: 0.875rem;
        line-height: 1.5rem;
        margin: 0;
    }

    ::before {
        background-color: ${({ color, theme }) => color || theme.component['legend-item-bullet-color']};
        border-radius: 50%;
        content: '';
        height: var(--size-half);
        margin: 0 var(--spacing-1x) 0 0;
        width: var(--size-half);
    }
`;

const Description = styled.span`
    color: ${({ theme }) => theme.component['legend-item-description-text-color']};
    display: block;
    font-size: 0.75rem;
    line-height: 1.25rem;
`;

interface LegendProps {
    className?: string;
    items: LegendItem[];
}

export const Legend: VoidFunctionComponent<LegendProps> = ({ className, items }) => {
    useEffect(() => {
        const itemNames: string[] = items.map((item) => item.name);
        if (new Set(itemNames).size !== items.length) {
            throw new Error('Duplicate names used for items');
        }
    }, [items]);

    return (
        <List className={className}>
            {items.map((item) => (
                <Item color={item.color} key={item.name}>
                    <div>
                        <p>{item.name}</p>
                        <Description>{item.description}</Description>
                    </div>
                </Item>
            ))}
        </List>
    );
};

Legend.displayName = 'Legend';
