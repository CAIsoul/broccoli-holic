export interface ValidationItem {
    name: string;
    validator: (val: any) => boolean,
    error: string;
    // 1-5, 1 validates on value change, 5 only validates on submit
    level: number;
}