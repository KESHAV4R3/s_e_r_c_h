import React, { useState } from 'react'

const NewsComponent = ({ author, title, description, url, img, published, source }) => {

    return (
        <div className='cursor-pointer relative flex flex-col gap-1 justify-start w-[90%] max-w-[400px] screen3:max-w-[457px] p-2 bg-[#00000080] rounded-lg mb-5'>
            <img src={img} className='aspect-auto w-full rounded-lg object-fit h-[150px] screen1:h-[200px]' alt={source} />
            <div className='w-full p-2'>
                <a href={url} target='blank'><p className='text-[14px] text-[#b7b6b6] mb-2'>{source}</p></a>
                <p className='text-[16px] screen3:text-[18px] mb-2'>{title}</p>
                <p className='text-[12px] screen3:text-[14px] text-[#b7b6b6] mb-2 mr-2'>{description} <span className='text-[#4786e4] text-[14px] hover:text-[#56d8fc]' onClick={() => { window.open(url, '_blank'); }}>read full article</span></p>
                <p className='text-[18px] screen3:text-[22px] text-[#2fbe2f] font-[600] mb-3 screen3:mb-5 hover:text-[#218e21]  inline-block' style={{ fontFamily: 'Glass Antiqua' }}>{author}</p>
                <p className='absolute bottom-2 text-[10px] screen1:text-[15px]'>{published}</p>
            </div>
        </div>
    )
}

export default NewsComponent
