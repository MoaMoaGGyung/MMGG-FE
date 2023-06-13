import { DefaultValue, atom, selector, selectorFamily } from "recoil";
import {  BreadCrumbType, KeywordType, boardType, departmentType, hotPostType, recentPostType } from "../types/types";
import axios from "axios";

const mock = axios.create({
    baseURL: import.meta.env.VITE_MOCK_BASE_URL,
    params: {
        key: import.meta.env.VITE_MOCK_KEY
    }
  });

const prod = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

const instance = prod;

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
            const response = await instance.get(`/hot`);
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
            const response = await instance.get(`/recent-posts?limit=6`);
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

export const departmentAtom = atom<departmentType>({
    key: 'departmentAtom',
    default: {
        department: {
            name: '',
            id: 0
        },
        boards: []
    }
})

export const departmentState = selectorFamily<departmentType, number>({
    key: 'departmentState',
    get: dId => async ({get}) => {
        const currentData = get(departmentAtom);
        if(!currentData.department.name) {
            const response = await instance(`/department/${dId}`)
            return response.data;
        }
        return currentData;
    },
    set: _ => ({set}, newValue) => {
        set(departmentAtom, newValue);
    }
})

export const boardAtom = atom<boardType>({
    key: 'boardAtom',
    default: {
        dName: '',
        bName: '',
        totalPage: 0,
        curPage: 0,
        posts: []
    }
})

export const boardState = selectorFamily<boardType, {dId: number; bId: number; page: number;}>({
    key: 'boardState',
    get: ({dId, bId, page}) => async ({get}) => {
        const currentData = get(boardAtom);
        if(!currentData.dName) {
            const response = await instance(`/department/${dId}/board/${bId}`)
            return response.data;
        }
        return currentData;
    },
    set: (_) => ({set}, newValue) => {
        if(!(newValue instanceof DefaultValue)) {
            set(boardAtom, newValue);
        }
    }
})

export const keywordAtom = atom<KeywordType>({
    key: 'keywordAtom',
    default: ''
})