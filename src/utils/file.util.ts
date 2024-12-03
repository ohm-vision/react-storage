"use client";

export class FileManager {

    private _length: number;
    get length() { return this._length; }

    constructor() {
    }

    async getItem(key: string) {
        return "";
    }
    async key(index: number) {
        throw new Error("Method not implemented.");
    }
    async removeItem(key: string) {
        throw new Error("Method not implemented.");
    }
    async setItem(key: string, value: string) {
        throw new Error("Method not implemented.");
    }

    clear() {}
}