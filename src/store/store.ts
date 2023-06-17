import { DefaultValue, atom, selector } from "recoil";
import {
    HotPostType,
    RecentPostType,
    CommonType,
    BreadcrumbType,
} from "../types/types";
import axios from "axios";

// const mock = axios.create({
//     baseURL: import.meta.env.VITE_MOCK_BASE_URL,
//     params: {
//         key: import.meta.env.VITE_MOCK_KEY,
//     },
// });

const prod = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

export const instance = prod;

export const alignmentTypeState = atom({
    key: "alignmentType",
    default: "date",
});

export const alignmentDirectionState = atom({
    key: "alignmentDirection",
    default: -1,
});

export const alignmentState = selector({
    key: "alignment",
    get: ({ get }) => {
        const type = get(alignmentTypeState);
        const direction = get(alignmentDirectionState);
        return { type, direction };
    },
});

export const hotPostAtom = atom<HotPostType[]>({
    key: "hotPostAtom",
    default: [],
});

export const recentPostAtom = atom<RecentPostType[]>({
    key: "recentPostAtom",
    default: [],
});

export const departmentAtom = atom<CommonType>({
    key: "departmentAtom",
    default: {
        name: "",
        id: 0,
    },
});

export const boardAtom = atom<CommonType>({
    key: "boardAtom",
    default: {
        name: "",
        id: 0,
    },
});

export const postAtom = atom<CommonType>({
    key: "postAtom",
    default: {
        name: "",
        id: 0,
    },
});

export const hotAtom = atom<CommonType>({
    key: "hotAtom",
    default: {
        name: "",
        id: 0,
    },
});

export const breadcrumbState = selector<BreadcrumbType>({
    key: "breadcrumbState",
    get: ({ get }) => {
        const department = get(departmentAtom);
        const board = get(boardAtom);
        const post = get(postAtom);
        const hot = get(hotAtom);
        return { department, board, post, hot };
    },
    set: ({ set, reset }, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            const { department, board, post, hot } = newValue;
            if (department) set(departmentAtom, department);
            if (board) set(boardAtom, board);
            if (post) set(postAtom, post);
            if (hot) set(hotAtom, hot);
        } else {
            reset(departmentAtom);
            reset(boardAtom);
            reset(postAtom);
            reset(hotAtom);
        }
    },
});

export const keywordAtom = atom({
    key: "keywordAtom",
    default: "",
});

export const allDepartmentAtom = atom<CommonType[]>({
    key: "allDepartmentAtom",
    default: [],
});

export const tabAtom = atom<"1" | "2">({
    key: "tabAtom",
    default: "1",
});
