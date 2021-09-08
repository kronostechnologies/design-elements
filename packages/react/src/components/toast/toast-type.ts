export enum ToastTypeEnum {
    INFORMATION = 'information',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error'
}

export type ToastType = `${ToastTypeEnum}`;
