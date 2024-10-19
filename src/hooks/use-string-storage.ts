import { StorageProps } from "../config/storage-props";
import { StorageInterface } from "../interfaces/storage-interface";
import { useStorage } from "./use-storage";

/**
 * Default string storage which defaults the `convert` to just pass back and forth the raw object
 * @param props 
 * @returns 
 */
export function useStringStorage<TElement extends string>(props: StorageProps<TElement>) : StorageInterface<TElement> {
    if (!props.convert) {
        props.convert = {
            fromStorage: v => v as TElement,
            toStorage: v => v
        };
    }

    return useStorage(props);
}