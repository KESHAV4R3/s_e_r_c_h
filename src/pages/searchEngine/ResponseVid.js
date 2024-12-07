import React from 'react';
import { useSelector } from 'react-redux';
import { OrbitProgress } from 'react-loading-indicators'

const ResponseVid = () => {
  const { searchResultVideos, exterResponseLoading } = useSelector(state => state.searchSlice);

  return (
    <div className='w-full h-full pl-3 screen3:pl-5'>
      {
        exterResponseLoading ? <div className='w-full h-full flex justify-center items-center -mt-[100px]'> <OrbitProgress variant="spokes" dense color="#09306e" size="medium" text="" textColor="#136494" /></div> :
          <div>
            {
              searchResultVideos?.video_results?.length > 0 ? <div className='mt-10'>
                {
                  searchResultVideos?.video_results?.map(value =>
                    <div className='bg-[#0c1729d4] max-w-[900px] w-[90%] p-4 rounded-lg flex flex-col gap-2 text-white'>
                      <a href={value.url}>{value.title ? value.source : 'address is not available....'}</a>
                      <p>{value.source ? value.source : 'source is not available....'}</p>
                      <p>{value.title ? value.source : 'title is not available....'}</p>
                      <p>{value.snippet.substring(0, 150)} ...</p>
                      <p className='text-blue-500'>{value.uploaded}</p>
                    </div>
                  )
                }
              </div> :
                <div className=' mt-[150px] flex justify-center items-center'>
                  <p className='text-[20px] screen3:text-[26px] bg-gray-800 inline p-2 rounded-lg'>Videos not found</p>
                </div>
            }
            {/* go for google response */}
            {Array.isArray(searchResultVideos?.pagination?.pages) && (
              <div>
                <p className='pl-3 screen3:pl-5 mt-5 text-[25px] font-[600] mb-4'>Go for Google response</p>
                <div className='pl-3 screen3:pl-5 flex gap-2'>
                  {searchResultVideos.pagination.pages.map(value => (
                    <div className='text-white cursor-pointer text-[19px] bg-gray-600 p-2 rounded-full w-[40px] h-[40px] flex justify-center items-center' key={value.page}>
                      <a target='_blank' href={value.link}>{value.page}</a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
      }
    </div>
  )
};

export default ResponseVid;