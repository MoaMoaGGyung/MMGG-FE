export type LoadableStateType = "hasValue" | "hasError" | "loading";

export interface commonType {
    id: number;
    name: string;
}

export type postType = {
    id: number;
    title: string;
    uploadDate: string;
    view: number;
    dailyFluctuation?: number;
    content?: string;
}

export type boardType = {
    dName: string;
    bName: string;
    totalPage: number;
    curPage: number;
    posts: postType[];
}

export type departmentType = {
    department: commonType;
    boards: {
        name: '',
        id: 0,
        posts: postType[];
    }[];
}

export type hotPostType = {
    department: commonType;
    board: commonType;
    post: Required<Omit<postType, 'content'>>;
}

export type recentPostType = {
    department: commonType;
    recent_posts: {
        title: string;
        dId: number;
        bId: number;
        pId: number;
    }[];
}

export type HomeType = {
    hot : hotPostType[];
    recent: recentPostType[];
}

export type BreadCrumbType = {
    department : commonType;
    board: commonType;
    post: {
        id: number;
        title: string;
    };
}

export type KeywordType = string;