export interface StorageItem<TElement> {
    /**
     * Converted storage value
     */
    obj: TElement;
    /**
     * Raw storage value
     */
    str: string;
}
