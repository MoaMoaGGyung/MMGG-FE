import { DefaultValue, atom, selector } from "recoil";
import { HomeType, boardType, departmentType, hotPostType, recentPostType } from "../types/types";
import axios from "axios";

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

export const hotPostAtom = atom<hotPostType[]>({
    key: 'hotPostAtom',
    default: []
})

export const hotPostState = selector<hotPostType[]>({
    key: 'hotPostState',
    get: async ({get}) => {
        const currentData = get(hotPostAtom);
        if(currentData.length === 0) {
            const response = await axios.get(`/hot?key=${import.meta.env.VITE_MOCK_KEY}`);
            return response.data;
        }
        return currentData;
    },
    set: ({set}, newValue) => {
        if(!(newValue instanceof DefaultValue)) {
            set(hotPostAtom, newValue);
        }
    }
})

export const recentPostAtom = atom<recentPostType[]>({
    key: 'recentPostAtom',
    default: []
})

export const recentPostState = selector<recentPostType[]>({
    key: 'recentPostState',
    get: async ({get}) => {
        const currentData = get(recentPostAtom);
        if(currentData.length === 0) {
            const response = await axios.get(`/recent-posts?key=${import.meta.env.VITE_MOCK_KEY}`);
            return response.data;
        }
        return currentData;
    },
    set: ({set}, newValue) => {
        if(!(newValue instanceof DefaultValue)) {
            set(recentPostAtom, newValue);
        }
    }
})
