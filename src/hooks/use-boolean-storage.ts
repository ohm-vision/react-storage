import { StorageProps } from "../config/storage-props";
import { StorageInterface } from "../interfaces/storage-interface";
import { useStorage } from "./use-storage";

/**
 * Default boolean storage which defaults the `convert` to a boolean initializer and string saver
 * @param props 
 * @returns 
 */
export function useBooleanStorage(props: StorageProps<Boolean>) : StorageInterface<Boolean> {
    if (!props.convert) {
        props.convert = {
            fromStorage: Boolean,
            toStorage: v => v.toString()
        };
    }

    return useStorage(props);
}