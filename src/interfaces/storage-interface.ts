type SetItem<TElement> = (item: TElement) => void;
type RemoveItem = () => void;
export type StorageInterface<TElement> = [ TElement, SetItem<TElement>, RemoveItem ];
