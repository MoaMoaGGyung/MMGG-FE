import { DefaultValue, atom, selector } from "recoil";

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

type articleType = {
    index: number;
    title: string;
    uploadDate: string;
    view: number;
}

export const curArticles = atom<articleType[]>({
    key: 'article',
    default: []
})

export const departmentState = atom({
    key: 'department',
    default: '',
})


export const curPathState = selector({
    key: 'curPath',
    get: ({get}) => {
        const board = get(boardState);
        const department = get(departmentState);
        return {department, board};
    },
    set: ({set, reset}, newValue) => {
        if(!(newValue instanceof DefaultValue)) {
            const {department, board} = newValue;
            set(departmentState, department);
            set(boardState, board);
        } else {
            reset(departmentState);
            reset(boardState);
        }
    }
})