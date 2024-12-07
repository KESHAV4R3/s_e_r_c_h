import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { PiDotsNineBold } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdImageSearch } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { changeSearchType, changeLoading } from '../../redux/slice/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomePageImg from '../../assets/HomePageImg.jpg'
import { TbMinusVertical } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import useResponse from '../../hooks/useResponse';
import { FaRegNewspaper } from "react-icons/fa6";


const Response = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleKeyPress, search, setSearch, fetchresult } = useResponse();

    const { searchType, searchQuery = '' } = useSelector((state) => state.searchSlice)

    useEffect(() => {
        localStorage.setItem('searchQuery', search);
    }, [search])

    useEffect(() => {
        const storedSearchQuery = localStorage.getItem('searchQuery');
        navigate(`/${storedSearchQuery}`)
        dispatch(changeLoading(true));
        dispatch(changeSearchType("All"));
        if (storedSearchQuery) {
            fetchresult();
        }
    }, []);

    return (
        <div style={{ backgroundImage: `url(${HomePageImg})` }} className="relative w-full h-full bg-cover bg-center text-white overflow-x-hidden overflow-y-auto pb-5">
            {/* header */}
            <div className='header flex flex-row justify-start items-center cursor-pointer w-full gap-[10px]'>

                <div className='toodle_name justify-self-start'
                    onClick={() => { navigate("/") }}>
                    <p style={{ fontFamily: 'Glass Antiqua' }} className={`ml-[10px] screen3:ml-0 select-none w-full top-[250px] z-[10] text-[50px] screen1:text-[60px] font-[600] text-center pl-[3px] screen2:pl-5 text-blue-400`}>Serch</p>
                </div>

                <div className='relative search-bar w-[90%] pl-3 flex justify-center  items-center'>
                    <div className='w-full rounded-lg border-[2px] border-gray-700'>
                        <input type='text' className={`pl-4 text-[18px] w-[95%] screen3:text-[20px] outline-none max-w-[600px] rounded-lg p-[5px] screen1:p-[10px] bg-transparent`}
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

                <div className='user_section flex items-center gap-[10px] mt-5 mr-[10px] screen3:mr-0 justify-self-end'>
                    <img className='w-[50px] h-[50px] rounded-full right-14 top-4 screen1:mr-[20px] ' src='https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D' />
                    <PiDotsNineBold className='text-white right-4 top-7 text-[30px] screen1:mr-[20px] font-[600]' />
                </div>

            </div>

            {/* search type */}
            <div className=' screen5:mt-[10px] mt-5 screen3:pl-5 pl-3'>
                <ul className='flex flex-row justify-start gap-6 max-w-[500px] text-[16px] screen5:text-[20px] select-none'>

                    <li className={`cursor-pointer flex justify-center items-center gap-[8px] ${searchType == "All" ? 'border-[#00FFFF]' : 'border-transparent'} pb-1 border-b-4 rounded`}
                        onClick={() => {
                            dispatch(changeSearchType("All"));
                            navigate(`/${searchQuery}`)
                        }}>
                        <IoSearchSharp />
                        <p>All</p>
                    </li>

                    <li className={`cursor-pointer flex justify-center items-center gap-[8px] ${searchType == "Images" ? 'border-[#00FFFF]' : 'border-transparent'} pb-1 border-b-4 rounded`}
                        onClick={() => {
                            dispatch(changeSearchType("Images"));
                            navigate(`/${searchQuery}/img`)
                        }}>
                        <MdImageSearch />
                        <p>images</p>
                    </li>

                    <li className={`cursor-pointer flex justify-center items-center gap-[8px] ${searchType == "Videos" ? 'border-[#00FFFF]' : 'border-transparent'} pb-1 border-b-4 rounded`}
                        onClick={() => {
                            dispatch(changeSearchType("Videos"));
                            navigate(`/${searchQuery}/vid`)
                        }}>
                        <MdOutlineOndemandVideo />
                        <p>Videos</p>
                    </li>

                    <li className={`cursor-pointer flex justify-center items-center gap-[8px] ${searchType == "Shopping" ? 'border-[#00FFFF]' : 'border-transparent'} pb-1 border-b-4 rounded`}
                        onClick={() => {
                            dispatch(changeSearchType("Shopping"));
                            navigate(`/${searchQuery}/news`)
                        }}>
                        <FaRegNewspaper />
                        <p>News</p>
                    </li>

                </ul>
            </div>

            <Outlet />
        </div>
    )
}

export default Response
