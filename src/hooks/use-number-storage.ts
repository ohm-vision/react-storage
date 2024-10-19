import { StorageProps } from "../config";
import { StorageInterface } from "../interfaces";
import { useStorage } from "./use-storage";

/**
 * Default number storage which defaults the `convert` to number initializers
 * @param props 
 * @returns 
 */
export function useNumberStorage(props: StorageProps<Number>) : StorageInterface<Number> {
    if (!props.convert) {
        props.convert = {
            fromStorage: v => +v,
            toStorage: v => v.toString()
        };
    }

    return useStorage(props);
}