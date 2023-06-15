import PostSkeletion from "./PostSkeleton";

function HotArticlesSkeleton() {
    return (
        <>
            {new Array(10).fill(0).map((_, index) => (
                <PostSkeletion key={index} />
            ))}
        </>
    );
}

export default HotArticlesSkeleton;
