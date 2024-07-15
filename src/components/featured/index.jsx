import FeaturedList from '@/components/featuredCategories/FeaturedList';

function Featured() {
    return (
        <div className="container mx-auto mt-24">
            <div className="flex justify-between items-baseline">
                <div className="font-bold md:text-2xl lg:text-3xl text-black-500 text-xl ">
                    Featured Categories
                </div>
                <div>See all</div>
            </div>
            <FeaturedList />
        </div>
    );
}

export default Featured;
