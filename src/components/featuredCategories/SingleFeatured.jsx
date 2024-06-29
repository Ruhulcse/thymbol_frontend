const SingleFeatured = ({ item }) => {
    return (
        <div className=" bg-white md:w-[209px] md:h-[224px] w-24 h-32 flex flex-col items-center justify-center rounded-xl md:rounded-none hover:shadow-lg transition-shadow delay-100 cursor-pointer">
            <div className="flex items-center  justify-center flex-col p-2 ">
                <img
                    src={item.image}
                    alt=""
                    className=" rounded-full  max-w-[120px] min-w-[80px] w-full max-h-[120px] min-h-[80px] h-full"
                />
            </div>
            <div className="text-black-500 text-center text-[11px] md:text-base md:mt-5 font-semibold">
                {item.name}
            </div>
        </div>
    );
};

export default SingleFeatured;
