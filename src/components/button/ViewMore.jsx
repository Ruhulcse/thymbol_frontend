import React from 'react';
import { useTranslation } from 'react-i18next';

const ViewMore = ({ className = '',  }) => {
  const { t } = useTranslation();
  return (
    <div className={` justify-center hidden ${className}`} >
      <button className="bg-[#0c9ad6] py-4 px-20 text-white text-center items-center inline-block mt-16 rounded-md">
        {t('View More')}
      </button>
    </div>
  );
};

export default ViewMore;
