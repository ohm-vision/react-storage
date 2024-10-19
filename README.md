# react-storage
A dead simple react hook for managing storage items.

This hook will load the storage item into React's state and can monitor for changes between tabs. It also offers standard update methods to mutate the storage value

[![npm version](https://badge.fury.io/js/@ohm-vision%2Freact-storage.svg)](https://badge.fury.io/js/@ohm-vision%2Freact-storage)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/1kom)

## Installation
Run the following command
```
npm install @ohm-vision/react-storage
```

## Usage
There are several hooks offered depending on your needs

> **Note:**
>
> The experimental `sharedStorage` is not supported by this hook at this time

### StorageProps
All storage hooks use the same props interface

* storageType (`session | local`): Determines the storage interface to use
  * `local` = `localStorage` [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  * `session` = `sessionStorage` [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
* key (`string`): The key to use when saving to the storage interface
* convert (`object`)
  * fromStorage (`string => TElement`): The converter from storage to the application
  * toStorage (`TElement => string`): The converter from the application to storage
* defaultValue (`TElement`): The default value to return if no storage value is found
* syncData (`boolean`): Whether or not to sync the storage data between tables (default: `true`)

### Return Type (StorageInterface<TElement>)
All storage hooks return the same triplet

* `TElement`: The value from storage (or default if empty)
* `SetItem<TElement>`: A function to set the value
* `RemoveItem`: A function to completely remove the item from storage and reset to the default

### useStorage<TElement>
This is the core hook - all other hooks will pull from here

This is meant to be used when there are custom converters between the application and the storage interface

This method will default the converter to using `JSON.parse` and `JSON.stringify` to read and write to storage

#### Example
```tsx
import { useStorage } from "@ohm-vision/use-storage";

type StorageValue = {
    firstName: string;
    lastName: string;
};

export function MyAwesomeComponent() {
    const [ value, setValue, removeValue ] = useStorage<StorageValue>({
        storageType: "session",
        key: "appValue",
        // shown for completeness, this method defaults to these two serializers
        convert: {
            fromStorage: (v: StorageValue) => JSON.stringify(v),
            toStorage: (v: string) => JSON.parse(v)
        },
        defaultValue: {} as StorageValue,
        syncData: true // activates tab syncing (defaults to true)
    });

    // todo: something with the value
}
```

### useBooleanStorage
An extension for the `useStorage<TElement>` hook which defaults the return type to a `boolean`

#### Example
```tsx
import { useBooleanStorage } from "@ohm-vision/use-storage";

export function MyAwesomeComponent() {
    const [ value, setValue, removeValue ] = useBooleanStorage({
        storageType: "session",
        key: "appValue",
        defaultValue: true,
        syncData: true // activates tab syncing (defaults to true)
    });

    // todo: something with the value
}
```

### useNumberStorage
An extension for the `useStorage<TElement>` hook which defaults the return type to a `number`

#### Example
```tsx
import { useNumberStorage } from "@ohm-vision/use-storage";

export function MyAwesomeComponent() {
    const [ value, setValue, removeValue ] = useNumberStorage({
        storageType: "session",
        key: "appValue",
        defaultValue: 1,
        syncData: true // activates tab syncing (defaults to true)
    });

    // todo: something with the value
}
```

### useDateStorage
An extension for the `useStorage<TElement>` hook which defaults the return type to a `Date`

#### Example
```tsx
import { useDateStorage } from "@ohm-vision/use-storage";

export function MyAwesomeComponent() {
    const [ value, setValue, removeValue ] = useDateStorage({
        storageType: "session",
        key: "appValue",
        defaultValue: new Date(),
        syncData: true // activates tab syncing (defaults to true)
    });

    // todo: something with the value
}
```

## Contact Me
[Ohm Vision, Inc](https://ohmvision.com)
