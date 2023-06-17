export type LoadableStateType = "hasValue" | "hasError" | "loading";

export interface CommonType {
    id: number;
    name: string;
}

export type PostPreviewType = {
    id: number;
    title: string;
    uploadDate: string;
    view: number;
    dailyFluctuation: number;
};

export type BoardType = {
    dname: string;
    bname: string;
    totalPage: number;
    curPage: number;
    posts: Omit<PostPreviewType, "dailyFluctuation">[];
};

export type DepartmentType = {
    department: CommonType;
    boards: {
        name: "";
        id: 0;
        posts: Omit<PostPreviewType, "dailyFluctuation">[];
    }[];
};

export type HotPostType = {
    department: CommonType;
    board: CommonType;
    post: PostPreviewType;
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
    hot?: CommonType;
};

export type KeywordType = string;

export type PostType = {
    board: CommonType;
    department: CommonType;
    post: PostDetailType;
};

export type PostDetailType = {
    base_url: string;
    attachCnt: number;
    body: string;
    id: number;
    title: string;
    uploadDate: string;
    view: number;
    writer: string;
};
