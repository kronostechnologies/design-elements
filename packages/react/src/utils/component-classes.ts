const DS_CLASS_PREFIX = 'eds-';

export const IGNORE_CLICK_OUTSIDE = 'react-datepicker-ignore-onclickoutside';

export function generateComponentClasses<T extends string>(componentName: string, keys: T[]): Record<T, string> {
    const classes = {} as Record<T, string>;

    const componentClass = componentName ? `${componentName}-` : '';
    keys.forEach((key) => {
        classes[key] = `${DS_CLASS_PREFIX}${componentClass}${key}`;
    });

    return classes;
}
