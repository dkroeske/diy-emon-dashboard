export interface Smartmeter {
    signature: string;
    power: {
        delivered: number,
        returned: number
    };
    timestamp: number;
}