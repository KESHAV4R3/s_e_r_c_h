import React from 'react'
import './Response.css'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { OrbitProgress } from 'react-loading-indicators'
import ResponseBox from '../../components/searchEngine/ResponseBox';
import TopStories from '../../components/searchEngine/TopStories';
import useResponse from '../../hooks/useResponse';

const Response = () => {

  const { searchResult = '', loading } = useSelector((state) => state.searchSlice)
  const { fetchresult } = useResponse()

  if (!searchResult) {
    return (
      <div>no data found</div>
    )
  }
  return (

    <div className="w-full h-full bg-cover bg-center text-white overflow-x-hidden overflow-y-auto pb-5 mt-3 screen3:mt-5">
      {
        loading ?
          <div className='w-full h-full flex justify-center -mt-[150px] items-center'><OrbitProgress variant="spokes" dense color="#09306e" size="medium" text="" textColor="#136494" /></div>
          :
          <div>

            {/* search_information */}
            {
              searchResult &&
              <p className='pl-3 screen3:pl-5 text-gray-300'>About {searchResult.search_information?.total_results || 0} results ({searchResult.search_information?.time_taken_displayed || 0} seconds)</p>
            }

            {/* Knowledge Graph */}
            {searchResult.knowledge_graph?.known_attributes && Array.isArray(searchResult.knowledge_graph.known_attributes) && (
              <div className='pl-3 screen3:pl-5 mt-5 flex gap-5 overflow-x-auto flex-shrink-0 pr-5'>
                <p className='max-w-[400px] min-w-[300px] h-[250px] bg-[#0c1729d4] p-4 rounded-lg text-[14px] screen3:text-[15px] text-gray-300 overflow-x-hidden'>
                  {searchResult.knowledge_graph.description}
                  <div className='pt-4'>
                    <a href={searchResult.knowledge_graph.source.url} target='_blank' className='text-blue-400'>{searchResult.knowledge_graph.source.name}</a>
                  </div>
                </p>
                {searchResult.knowledge_graph.known_attributes.map(value => (
                  <div className='flex flex-col max-w-[400px] min-w-[300px] min-h-[180px] bg-[#0c1729d4] p-4 rounded-lg text-[14px] screen3:text-[17px]' key={value.name}>
                    <p className='text-[20px] mb-4'>{value.name}</p>
                    <p className='text-gray-300 text-[16px]'>{value.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Profiles */}
            {Array.isArray(searchResult.knowledge_graph?.profiles) && (
              <div>
                <p className='pl-3 screen3:pl-5 mt-5 text-[25px] font-[600]'>Follow on</p>
                <div className='pl-3 screen3:pl-5 mt-5 flex flex-rows gap-5 overflow-x-auto flex-shrink-0 pr-5'>
                  {searchResult.knowledge_graph.profiles.map(value => (
                    <div className='max-w-[400px] min-w-[200px] bg-[#0c1729d4] p-4 rounded-lg text-[14px] screen3:text-[17px]' key={value.name}>
                      <a target='_blank' href={value.url}>@{value.name}</a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Stories */}
            {Array.isArray(searchResult.top_stories) && (
              <div>
                <h1 className='pl-3 screen3:pl-5 mt-5 text-[25px] font-[600]'>Top Stories</h1>
                <div className='top-stories flex gap-5 pl-3 mt-3 text-gray-300 text-[14px] overflow-x-auto flex-shrink-0 pr-5'>
                  {searchResult.top_stories.filter(value => value.title !== 'People also ask').map(value => (
                    <a href={value.url} target='_blank' key={value.block_position}>
                      <TopStories value={value} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Organic Results */}
            {Array.isArray(searchResult.organic_results) && (
              <div className='pl-5 mt-8 flex flex-col gap-5 overflow-y-auto'>
                {searchResult.organic_results.map(value => (
                  <ResponseBox key={value.position} value={value} />
                ))}
              </div>
            )}

            {/* Related Questions */}
            {Array.isArray(searchResult.related_questions) && (
              <div>
                <p className='pl-3 screen3:pl-5 mt-5 text-[25px] font-[600] mb-4'>People also ask</p>
                <div className='flex flex-col'>
                  {searchResult.related_questions.map(value => (
                    <a
                      className='pl-3 screen3:pl-5 text-gray-300 mb-4 text-[18px]'
                      href={value.displayed_url}
                      onClick={() => {
                        localStorage.setItem('searchQuery', value.question.split('?')[0]);
                        fetchresult(value.question.split('?')[0]);
                      }}
                      key={value.question}
                    >
                      {value.question.split('?')[0]} ?
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {Array.isArray(searchResult.pagination?.pages) && (
              <div>
                <p className='pl-3 screen3:pl-5 mt-5 text-[25px] font-[600] mb-4'>Go for Google response</p>
                <div className='pl-3 screen3:pl-5 flex gap-2'>
                  {searchResult.pagination.pages.map(value => (
                    <div className='text-white cursor-pointer text-[19px] bg-gray-600 p-2 rounded-full w-[40px] h-[40px] flex justify-center items-center' key={value.page}>
                      <a target='_blank' href={value.link}>{value.page}</a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Outlet />
          </div>
      }

    </div>
  )
}

export default Response;