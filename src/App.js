import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/searchEngine/Home'
import Response from './pages/searchEngine/Response'
import ResponseAll from './pages/searchEngine/ResponseAll'
import ResponseImg from './pages/searchEngine/ResponseImg'
import NewsPage from './pages/news/NewsPage'
import ResponseVid from './pages/searchEngine/ResponseVid'
import { useSelector } from 'react-redux'
import ResponseNews from './pages/searchEngine/ResponseNews'

const App = () => {

  const { searchResultImages,
    searchResultVideos,
    searchResultNews,
    exterResponseLoading } = useSelector(state => state.searchSlice)

  useEffect(() => {
    console.log(searchResultImages,
      searchResultVideos,
      searchResultNews,
      exterResponseLoading)
  }, [searchResultImages,
    searchResultVideos,
    searchResultNews,
    exterResponseLoading])
  return (
    <div className='w-full h-[100vh] overflow-x-hidden overflow-y-auto'>
      <Routes>

        <Route path='/'>
          <Route index element={<Home />} />
          <Route path=':search_query' element={<Response />}>
            <Route index element={<ResponseAll />} />
            <Route path='img' element={<ResponseImg />} />
            <Route path='vid' element={<ResponseVid />} />
            <Route path='news' element={<ResponseNews />} />
          </Route>
        </Route>

        <Route path='/serch_News' element={<NewsPage />} />

      </Routes>
    </div>
  )
}

export default App
