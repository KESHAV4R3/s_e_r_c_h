import React, { useEffect } from 'react'
import HomePageImg from '../../assets/HomePageImg.jpg'
import { IoMdSearch } from "react-icons/io";
import { PiDotsNineBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { TbMinusVertical } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { OrbitProgress } from 'react-loading-indicators'
import { FaArrowRight } from "react-icons/fa";
import useHome from '../../hooks/useHome';

const Home = () => {

    const { homeNewsLoading, search, handleKeyPress, fetchresult, fetchNews, setSearch } = useHome();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { news = [] } = useSelector(state => state.searchSlice);

    useEffect(() => { fetchNews() }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            localStorage.clear();
            return;
        }
    }, [location.pathname, dispatch])

    return (
        <div style={{ backgroundImage: `url(${HomePageImg})` }} className="w-full h-full bg-cover bg-center text-white overflow-x-hidden overflow-y-auto pb-5">

            <div className='flex justify-between items-center w-full px-[20px] h-[100px]'>
                <div>
                    <p style={{ fontFamily: 'Glass Antiqua' }} className={`select-none w-full z-[10] text-[50px] screen1:text-[60px] font-[600] pl-2 screen2:pl-8 text-center`}>Serch</p>
                </div>
                <div className='flex items-center gap-[10px] mt-5'>
                    <img className='w-[50px] h-[50px] rounded-full right-14 top-4 screen1:mr-[20px] ' src='https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D' />
                    <PiDotsNineBold className='text-white right-4 top-7 text-[30px] screen1:mr-[20px] font-[600]' />
                </div>
            </div>

            <div className='flex justify-center w-full'>
                <div className={`relative search-bar w-[90%] max-w-[650px] flex justify-center items-center mt-[150px]`}>
                    <div className='w-full rounded-lg border-[2px] border-gray-500 bg-[#132a5670]'>
                        <input type='text' className={`pl-4 text-[18px] screen3:text-[20px] w-[80%] outline-none max-w-[600px] rounded-lg p-[5px] screen1:p-[10px] bg-transparent`}
                            placeholder='search here ....'
                            value={search}
                            onChange={(event) => { setSearch(event.target.value) }}
                            onKeyPress={handleKeyPress}
                        >
                        </input>
                        <div
                            className='absolute flex justify-center items-center right-2 top-2 screen2:top-3'>
                            <RxCross2 className='text-[20px] text-gray-500 screen2:text-[30px] cursor-pointer'
                                onClick={() => { setSearch("") }}
                            />
                            <TbMinusVertical className='text-[25px] text-gray-700 screen2:text-[30px] cursor-pointer' />
                            <IoMdSearch className='text-[20px] text-gray-300 screen2:text-[30px] cursor-pointer'
                                onClick={() => { fetchresult(search) }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center gap-5 mt-4 text-gray-300 text-[14px] flex-wrap pr-5'>
                <div className='w-[50px] h-[40px] screen2:w-[60px] screen2:h-[50px] flex-shrink-0 bg-gray-800 rounded-lg flex justify-center items-center'>
                    <a href='https://www.youtube.com/' target='_blank'>
                        <img className='w-[38px] h-[30px] screen3:w-[48px] screen3:h-[35px] rounded-lg object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwX0s0adw2u0QowIZbamUhIyVVaPb339eBA&s' />
                    </a>
                </div>
                <div className='w-[50px] h-[40px] screen2:w-[60px] screen2:h-[50px] flex-shrink-0 bg-gray-800 rounded-lg flex justify-center items-center'>
                    <a href='https://www.instagram.com//' target='_blank'>
                        <img className='w-[38px] h-[30px] screen3:w-[48px] screen3:h-[35px] rounded-lg object-cover' src='https://cdn.pixabay.com/photo/2018/11/13/22/01/instagram-3814080_640.png' />
                    </a>
                </div>
                <div className='w-[50px] h-[40px] screen2:w-[60px] screen2:h-[50px] flex-shrink-0 bg-gray-800 rounded-lg flex justify-center items-center'>
                    <a href='https://open.spotify.com/' target='_blank'>
                        <img className='w-[38px] h-[30px] screen3:w-[48px] screen3:h-[35px] rounded-lg object-cover' src='https://play-lh.googleusercontent.com/eN0IexSzxpUDMfFtm-OyM-nNs44Y74Q3k51bxAMhTvrTnuA4OGnTi_fodN4cl-XxDQc' />
                    </a>
                </div>
                <div className='w-[50px] h-[40px] screen2:w-[60px] screen2:h-[50px] flex-shrink-0 bg-gray-800 rounded-lg flex justify-center items-center'>
                    <a href='https://indianexpress.com/about/online-portal/' target='_blank'>
                        <img className='w-[38px] h-[30px] screen3:w-[48px] screen3:h-[35px] rounded-lg object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9qrc84skMwWAQSwuUX1_T5tnIWYct3GzNSg&s' />
                    </a>
                </div>
                <div className='w-[50px] h-[40px] screen2:w-[60px] screen2:h-[50px] flex-shrink-0 bg-gray-800 rounded-lg flex justify-center items-center'>
                    <a href='https://www.moneycontrol.com//' target='_blank'>
                        <img className='w-[38px] h-[30px] screen3:w-[48px] screen3:h-[35px] rounded-lg object-cover' src='https://play-lh.googleusercontent.com/qTe9gNn4oQ_TRLtVqWBr_CeqXqcSMniRo1kZOUKLcK0huJ6V3qL6ibEOnK6Xls1k4Rg' />
                    </a>
                </div>
                <div className='w-[50px] h-[40px] screen2:w-[60px] screen2:h-[50px] flex-shrink-0 bg-gray-800 rounded-lg flex justify-center items-center'>
                    <a href='https://www.amazon.in/' target='_blank'>
                        <img className='w-[38px] h-[30px] screen3:w-[48px] screen3:h-[35px] rounded-lg object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7yO7eBKdwllZI7yNp37T6tE-P61p0Q0mJbw&s' />
                    </a>
                </div>
            </div>

            {/* home page news */}
            {
                news && news.length >= 3 && (
                    <div className='flex justify-start screen3:justify-center items-center overflow-x-auto flex-shrink-0'>
                        <div div className='flex justify-center items-center gap-4 pl-5 mt-10 text-gray-300 pr-5 max-w-[1200px]'>

                            {
                                homeNewsLoading ? <div className='w-[180px] h-[150px] screen2:w-[250px] screen2:h-[200px] flex justify-center items-center bg-gray-800'><OrbitProgress variant="spokes" dense color="#09306e" size="medium" text="" textColor="#136494" /></div> :
                                    <a href={news[0].url} target='_blank'>
                                        <div className='flex flex-col w-[180px] h-[150px] screen2:w-[250px] screen2:h-[200px] rounded-lg bg-gray-800 p-2'>
                                            <img alt='serch_news' src={news[0].urlToImage} className='h-[58%] object-cover rounded-lg' />
                                            <p className='w-full text-[10px] screen2:text-[13px] mt-1'>{news[0].title.substring(0, 150)} ......</p>
                                        </div>
                                    </a>
                            }
                            {
                                homeNewsLoading ? <div className='w-[180px] h-[150px] screen2:w-[250px] screen2:h-[200px]  flex justify-center items-center bg-gray-800'><OrbitProgress variant="spokes" dense color="#09306e" size="medium" text="" textColor="#136494" /></div> :
                                    <a href={news[0].url} target='_blank'>
                                        <div className='flex flex-col w-[180px] h-[150px] screen2:w-[250px] screen2:h-[200px] rounded-lg bg-gray-800 p-2'>
                                            <img alt='serch_news' src={news[1].urlToImage} className='h-[58%] object-cover rounded-lg' />
                                            <p className='w-full text-[10px] screen2:text-[13px] mt-1'>{news[1].title.substring(0, 150)} ......</p>
                                        </div>
                                    </a>
                            }
                            {
                                homeNewsLoading ? <div className='w-[180px] h-[150px] screen2:w-[250px] screen2:h-[200px]  flex justify-center items-center bg-gray-800'><OrbitProgress variant="spokes" dense color="#09306e" size="medium" text="" textColor="#136494" /></div> :
                                    <a href={news[0].url} target='_blank'>
                                        <div className='flex flex-col w-[180px] h-[150px] screen2:w-[250px] screen2:h-[200px] rounded-lg bg-gray-800 p-2'>
                                            <img alt='serch_news' src={news[2].urlToImage} className='h-[58%] object-cover rounded-lg' />
                                            <p className='w-full text-[10px] screen2:text-[13px] mt-1'>{news[2].title.substring(0, 150)} ......</p>
                                        </div>
                                    </a>
                            }
                            {
                                homeNewsLoading ? <div className='w-[180px] h-[150px] screen2:w-[250px] screen2:h-[200px]  flex justify-center items-center bg-gray-800'><OrbitProgress variant="spokes" dense color="#09306e" size="medium" text="" textColor="#136494" /></div> :
                                    <a href={news[0].url} target='_blank'>
                                        <div className='flex flex-col w-[180px] h-[150px] screen2:w-[250px] screen2:h-[200px] rounded-lg bg-gray-800 p-2'>
                                            <img alt='serch_news' src={news[3].urlToImage} className='h-[58%] object-cover rounded-lg' />
                                            <p className='w-full text-[10px] screen2:text-[13px] mt-1'>{news[3].title.substring(0, 150)} ......</p>
                                        </div>
                                    </a>
                            }

                        </div>
                    </div>
                )

            }
            <div className='flex justify-center items-center gap-4 mt-8 text-gray-300 cursor-pointer'
                onClick={() => { navigate('/serch_news') }}>
                <p className='text-[18px]'>Follow more such news </p>
                <FaArrowRight />
            </div>

        </div >
    )
}

export default Home
