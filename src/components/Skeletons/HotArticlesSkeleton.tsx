import PostSkeleton from "./PostSkeleton";

function HotArticlesSkeleton() {
    return (
        <>
            {new Array(10).fill(0).map((_, index) => (
                <PostSkeleton key={index} />
            ))}
        </>
    );
}

export default HotArticlesSkeleton;
