import { StorageProps } from "../config/storage-props";
import { StorageInterface } from "../interfaces/storage-interface";
import { useStorage } from "./use-storage";

/**
 * Default Date storage which defaults the `convert` to `Date` initializers
 * @param props 
 * @returns 
 */
export function useDateStorage(props: StorageProps<Date>) : StorageInterface<Date> {
    if (!props.convert) {
        props.convert = {
            fromStorage: v => new Date(v),
            toStorage: v => v.toISOString()
        };
    }

    return useStorage(props);
}