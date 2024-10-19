import { Convert } from "./convert";

export interface StorageProps<TElement> {
    /**
     * Indicates if we should be using `sessionStorage` or `localStorage`
     */
    storageType: "session" | "local";
    /**
     * Key to be used when saving items into storage
     */
    key: string;
    /**
     * Converter methods between the storage interface and the client
     */
    convert?: Convert<TElement>;
    /**
     * Default value to use
     */
    defaultValue?: TElement;
    /**
     * Syncs data via storage events - defaults to TRUE
     */
    syncData?: boolean;
}