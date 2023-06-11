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
    department: commonType;
    board: commonType;
    totalPage: number;
    curPage: number;
    posts?: postType[];
}

export type departmentType = {
    department: commonType;
    board: commonType & {
        posts: postType[];
    }
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