export type LoadableStateType = "hasValue" | "hasError" | "loading";

export interface CommonType {
    id: number;
    name: string;
}

export type PostType = {
    id: number;
    title: string;
    uploadDate: string;
    view: number;
    dailyFluctuation?: number;
    content?: string;
};

export type BoardType = {
    dname: string;
    bname: string;
    totalPage: number;
    curPage: number;
    posts: PostType[];
};

export type DepartmentType = {
    department: CommonType;
    boards: {
        name: "";
        id: 0;
        posts: PostType[];
    }[];
};

export type HotPostType = {
    department: CommonType;
    board: CommonType;
    post: Required<Omit<PostType, "content">>;
};

export type RecentPostType = {
    department: CommonType;
    recent_posts: {
        title: string;
        dId: number;
        bId: number;
        pId: number;
    }[];
};

export type HomeType = {
    hot: HotPostType[];
    recent: RecentPostType[];
};

export type BreadcrumbType = {
    department?: CommonType;
    board?: CommonType;
    post?: CommonType;
};

export type KeywordType = string;

// export type PostType = {
//     department: CommonType;
// };
