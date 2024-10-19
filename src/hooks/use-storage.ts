import { useEffect, useState } from "react";
import { IsBrowser } from "../utils/browser.util";
import { StorageProps } from "../config/storage-props";
import { StorageInterface } from "../interfaces/storage-interface";
import { StorageItem } from "../interfaces/storage-item";

const EMPTY = "";

/**
 * Default storage hook, this method is what all other `use{type}Storage` methods derive from
 * 
 * This hook will default to `JSON.parse` and `JSON.stringify` to convert methods
 * @param props 
 * @returns 
 */
export function useStorage<TElement>(props: StorageProps<TElement>) : StorageInterface<TElement> {
    let { storageType, key, convert, defaultValue, syncData } = props;

    if (!Boolean(storageType)) storageType = "session";

    if (storageType !== "session" && storageType !== "local") throw new Error("Invalid storageType specified");

    if (!key) throw new Error("Unable to initialize stateful storage without key");

    if (!convert) {
        convert = {
            fromStorage: JSON.parse,
            toStorage: JSON.stringify
        };
    }

    const { fromStorage, toStorage } = convert;

    if (!fromStorage) throw new Error("No fromStorage specified in convert");

    if (!toStorage) throw new Error("No toStorage specified in convert");

    const isBrowser: boolean = IsBrowser();
    const storageApi: Storage = isBrowser ? window[`${storageType}Storage`] : null;

    /// internals
    function getItemInternal() { 
        return storageApi?.getItem(key);
    }
    function setItemInternal(value: string) {
        storageApi?.setItem(key, value);
    }
    function removeItemInternal() {
        storageApi?.removeItem(key);
    }

    const [ storedValue, setStoredValue ] = useState<StorageItem<TElement>>(getItem());

    // attach event listeners
    useEffect(() => {
        function onStorage(e: StorageEvent) {
            if (e.key === key) {
                setValue(e.newValue);
            }
        }

        if (syncData !== false) {
            window.addEventListener("storage", onStorage, false);

            return () => window.removeEventListener("storage", onStorage, false);
        }
    }, [ syncData, key ]);

    function setValue(str: string) {
        if (str !== storedValue.str) {
            const obj = strToObj(str);

            setStoredValue({
                obj: obj,
                str: str
            });
        }
    }

    function setItem(value: TElement) {
        const str = objToStr(value);

        setValue(str);

        if (isEmpty(str)) {
            removeItemInternal();
        } else {
            setItemInternal(str);
        }
    }

    function removeItem() {
        setItem(null);
    }

    function getItem(): StorageItem<TElement> {
        const str = getItemInternal() || EMPTY;

        const obj = strToObj(str);

        return {
            obj: obj,
            str: str,
        };
    }

    function isEmpty(str: string) {
        return str === EMPTY;
    }

    function isDefault(obj: TElement) {
        return obj == null || obj === defaultValue;
    }

    function objToStr(obj: TElement): string {
        let str: string;

        if (isDefault(obj)) str = EMPTY;
        else str = toStorage(obj);

        return str;
    }

    function strToObj(str: string): TElement {
        let obj: TElement;

        if (isEmpty(str)) obj = defaultValue;
        else obj = fromStorage(str);

        return obj;
    }

    return [ storedValue?.obj, setItem, removeItem ];
}