export interface Convert<TElement> {
    /**
     * How to convert the value saved in storage to the desired type
     * @param value 
     * @returns 
     */
    fromStorage: (value: string) => TElement;
    /**
     * How to convert the typed value to a storable string
     * @param value 
     * @returns 
     */
    toStorage: (element: TElement) => string;
}
