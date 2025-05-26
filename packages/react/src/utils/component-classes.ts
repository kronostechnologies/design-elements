const DS_CLASS_PREFIX = 'eds-';

// This classname cannot be configured at the moment in react-datepicker (https://github.com/Hacker0x01/react-datepicker/pull/5645)
export const IGNORE_CLICK_OUTSIDE = 'react-datepicker-ignore-onclickoutside';

export function generateComponentClasses<T extends string>(componentName: string, keys: T[]): Record<T, string> {
    const classes = {} as Record<T, string>;

    const componentClass = componentName ? `${componentName}-` : '';
    keys.forEach((key) => {
        classes[key] = `${DS_CLASS_PREFIX}${componentClass}${key}`;
    });

    return classes;
}
