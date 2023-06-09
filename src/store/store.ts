import { atom, selector } from "recoil";

export const alignmentTypeState = atom({
    key: 'alignmentType',
    default: 'date',
})

export const alignmentDirectionState = atom({
    key: 'alignmentDirection',
    default: -1
})

export const alignmentState = selector({
    key: 'alignment',
    get: ({get}) => {
        const type = get(alignmentTypeState);
        const direction = get(alignmentDirectionState);
        return {type, direction};
    }
})

export const boardState = atom({
    key: 'board',
    default: '',
})

export const departmentState = atom({
    key: 'department',
    default: '',
})