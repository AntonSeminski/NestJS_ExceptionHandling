export interface IIsSkip {
    is(request: any): Promise<boolean> | boolean;
}