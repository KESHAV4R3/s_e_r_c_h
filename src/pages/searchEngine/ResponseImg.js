import React from 'react';
import { useSelector } from 'react-redux';
import { OrbitProgress } from 'react-loading-indicators'

const ResponseImg = () => {
  const { searchResultImages, exterResponseLoading } = useSelector(state => state.searchSlice);


  if (searchResultImages?.image_results?.length == 0) {
    return (
      <div className='w-full h-full pl-3 screen3:pl-5'>
        {
          exterResponseLoading ? <div className='w-full h-full flex justify-center items-center -mt-[100px]'> <OrbitProgress variant="spokes" dense color="#09306e" size="medium" text="" textColor="#136494" /></div> :
            <div>
              {
                searchResultImages?.video_results?.length > 0 ?
                  <div className='mt-10'>
                    {
                      searchResultImages?.image_results?.map(value =>
                        <div>
                          <img src={value.image_url} />
                          <p>{value.source}</p>
                          <p>{value.title}</p>
                        </div>
                      )
                    }
                  </div> :
                  <div className=' mt-[150px] flex justify-center items-center'>
                    <p className='text-[20px] screen3:text-[26px] bg-gray-800 inline p-2 rounded-lg'>images not found</p>
                  </div>
              }
            </div>
        }

        {/* go for google response */}
        {Array.isArray(searchResultImages?.pagination?.pages) && (
          <div>
            <p className='pl-3 screen3:pl-5 mt-5 text-[25px] font-[600] mb-4'>Go for Google response</p>
            <div className='pl-3 screen3:pl-5 flex gap-2'>
              {searchResultImages.pagination.pages.map(value => (
                <div className='text-white cursor-pointer text-[19px] bg-gray-600 p-2 rounded-full w-[40px] h-[40px] flex justify-center items-center' key={value.page}>
                  <a target='_blank' href={value.link}>{value.page}</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
};

export default ResponseImg;