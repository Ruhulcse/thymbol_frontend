import React from 'react';

const ViewMore = ({ className = '',  }) => {
  return (
    <div className={` justify-center hidden ${className}`} >
      <button className="bg-[#0c9ad6] py-2 px-20 text-white text-center items-center inline-block mt-16 rounded-md">
        View More
      </button>
    </div>
  );
};

export default ViewMore;
