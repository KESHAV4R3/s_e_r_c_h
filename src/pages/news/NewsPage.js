import React, { useState, useEffect, useRef } from 'react'
import './ResultPage.css'
import HomePageImg from '../../assets/HomePageImg.jpg'
import { IoSearchOutline } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import NewsComponent from '../../components/news/NewsComponent'
import CatNewsComponent from '../../components/news/CatNewsComponent';
import { OrbitProgress } from 'react-loading-indicators'
import { useNavigate, useLocation } from 'react-router-dom';

const NewsPage = () => {
  const API_KEY = "6f49d479da5640d1a04c2f1540aa6969";

  const location = useLocation();
  const navigate = useNavigate()
  const [newsData, setNewsData] = useState([]);
  const [catNewsData, setCatNewsData] = useState([]);
  const [category, setCategory] = useState("");
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingCatNews, setLoadingCatNews] = useState(false);

  useEffect(() => {
    if (location.pathname.split('/').at(-2) == "news") {
      setCategory(location.pathname.split('/').at(-1))
    }
  })


  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    setLoadingNews(true);
    try {
      const response1 = await fetch(
        `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines/sources?&language=en&apiKey=${API_KEY}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const formateResponse1 = await response1.json();
      setNewsData(formateResponse1.articles || []);
    } catch (error) {
      console.error("Error fetching news data:", error);
      setNewsData([]);
    } finally {
      setLoadingNews(false);
    }
  }

  async function filterNews(value) {
    setLoadingCatNews(true);
    try {
      const response2 = await fetch(
        `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines/sources?category=${value}&language=en&apiKey=${API_KEY}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const formateResponse2 = await response2.json();
      setCatNewsData(formateResponse2.sources || []);
    } catch (error) {
      console.error("Error fetching category news data:", error);
      setCatNewsData([]);
    } finally {
      setLoadingCatNews(false);
    }
  }
  return (
    <div
      style={{ backgroundImage: `url(${HomePageImg})` }}
      className='realtive h-full text-white bg-center bg-fixed bg-cover overflow-hidden'>

      {/* header */}
      <div className='header w-[95%] m-auto  pt-10 items-center'>

        <p style={{ fontFamily: 'Glass Antiqua', maxWidth: '300px' }} className='relative flex items-baseline gap-2 name-container text-white select-none w-[30%] text-[50px] screen2:text-[56px]'
          onClick={() => { navigate('/') }}>Serch</p>
        <div className='account-container flex justify-center items-center gap-[20px]'>
          <img className='w-[50px] h-[50px] screen2:w-[60px] screen2:h-[60px]  rounded-full' src='https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D' />
          <PiDotsNineBold className='text-white text-[30px] screen2:text-[40px] font-[600]' />
        </div>
      </div>

      {/* news box */}
      <div
        className='result-box overflow-x-hidden w-[95%] m-auto mt-[20px] h-[80vh] p-[10px] bg-[#0c1729d4] rounded-lg pb-10'>
        {/* category box */}
        <div className='w-[95%] m-auto flex justify-evenly items-center mt-[20px] mb-[50px] text-[15px] screen2:text-[20px] flex-wrap gap-2'>
          <div className={`w-[11%] min-w-[150px] text-center p-2 cursor-pointer ${category == "" ? 'bg-black' : 'bg-[#0000005b]'}`} value="general" onClick={() => { fetchData(); setCategory("") }}>All</div>
          <div className={`w-[11%] min-w-[150px] text-center p-2 cursor-pointer ${category == "business" ? 'bg-black' : 'bg-[#0000005b]'}`} value="business" onClick={() => { filterNews("business"); setCategory("business") }}>business</div>
          <div className={`w-[11%] min-w-[150px] text-center p-2 cursor-pointer ${category == "entertainment" ? 'bg-black' : 'bg-[#0000005b]'}`} value="entertainment" onClick={() => { filterNews("entertainment"); setCategory("entertainment") }}>entertainment</div>
          <div className={`w-[11%] min-w-[150px] text-center p-2 cursor-pointer ${category == "health" ? 'bg-black' : 'bg-[#0000005b]'}`} value="health" onClick={() => { filterNews("health"); setCategory("health") }}>health</div>
          <div className={`w-[11%] min-w-[150px] text-center p-2 cursor-pointer ${category == "science" ? 'bg-black' : 'bg-[#0000005b]'}`} value="science" onClick={() => { filterNews("science"); setCategory("science") }}>science</div>
          <div className={`w-[11%] min-w-[150px] text-center p-2 cursor-pointer ${category == "sports" ? 'bg-black' : 'bg-[#0000005b]'}`} value="sports" onClick={() => { filterNews("sports"); setCategory("sports") }}>sports</div>
          <div className={`w-[11%] min-w-[150px] text-center p-2 cursor-pointer ${category == "technology" ? 'bg-black' : 'bg-[#0000005b]'}`} value="technology" onClick={() => { filterNews("technology"); setCategory("technology") }}>technology</div>
        </div>

        <div className='w-full flex flex-wrap gap-5 justify-center item-center'>
          {
            loadingNews ? (
              <div className='w-full h-full flex justify-center mt-[100px]'>
                <OrbitProgress variant="spokes" dense color="#09306e" size="medium" text="" textColor="#136494" />
              </div>
            ) : category.length > 0 ? (
              loadingCatNews ? (
                <div className='w-full h-full flex justify-center mt-[100px]'>
                  <OrbitProgress variant="spokes" dense color="#09306e" size="medium" text="" textColor="#136494" />
                </div>
              ) : (
                catNewsData.map(value => (
                  <CatNewsComponent url={value.url} name={value.name} description={value.description} category={value.category} />
                ))
              )
            ) : (
              newsData.map(value => (
                <NewsComponent key={value.url} author={value.author} title={value.title} description={value.description} url={value.url} img={value.urlToImage} published={value.publishedAt} source={value.source.name} />
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default NewsPage
