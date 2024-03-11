export enum ToastTypeEnum {
    NEUTRAL = 'neutral',
    DISCOVERY = 'discovery',
    SUCCESS = 'success',
    WARNING = 'warning',
    ALERT = 'alert'
}

export type ToastType = `${ToastTypeEnum}`;
