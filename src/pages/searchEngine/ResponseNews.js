import React from 'react'
import { useSelector } from 'react-redux';
import { OrbitProgress } from 'react-loading-indicators'

const ResponseNews = () => {

  const { searchResultNews, exterResponseLoading } = useSelector(state => state.searchSlice);


  return (
    <div className='w-full h-full pl-3 screen3:pl-5'>
      {
        exterResponseLoading ? <div className='w-full h-full flex justify-center items-center -mt-[100px]'> <OrbitProgress variant="spokes" dense color="#09306e" size="medium" text="" textColor="#136494" /></div> :
          <div>
            {
              searchResultNews?.news_results?.length > 0 ? <div className='flex flex-col gap-5 mt-10 pb-5'>
                {
                  searchResultNews?.news_results?.map(value =>
                    <div className='bg-[#0c1729d4] p-4 rounded-lg max-w-[900px] w-[90%] flex flex-col gap-5 overflow-hidden'>
                      <p className='screen3:text-[20px] text-gray-300'>{value.source_name}</p>
                      <p className='screen3:text-[25px] leading-7'>{value.title}</p>
                      <a href={value.url} target='_blank' className='text-gray-300'>{value.url}</a>
                      <p className='text-blue-500'>{value.uploaded_utc}</p>
                    </div>
                  )
                }
              </div> :
                <div className=' mt-[150px] flex justify-center items-center'>
                  <p className='text-[20px] screen3:text-[26px] bg-gray-800 inline p-2 rounded-lg'>news not found</p>
                </div>
            }

            {/* go for google response */}
            {Array.isArray(searchResultNews?.pagination?.pages) && (
              <div>
                <p className='pl-3 screen3:pl-5 mt-5 text-[25px] font-[600] mb-4'>Go for Google response</p>
                <div className='pl-3 screen3:pl-5 flex gap-2 pb-10'>
                  {searchResultNews.pagination.pages.map(value => (
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
}

export default ResponseNews
