import React from 'react'

const ResponseBox = ({ value }) => {

    return (
        <div className='flex flex-col border-b-[1px] border-gray-800 pb-5'>
            <a href={value.url} className='text-[#38c0e6] screen2:text-[20px] text-[18px]' target='_blank'>{value.displayed_url}</a>
            <a href={value.domain} className='text-gray-400 -mt-1' target='_blank'>{value.domain}</a>
            <a href={value.displayed_url} target='_blank' className='text-gray-300 text-[16px] screen2:text-[18px] mt-2'>{value.title}</a>
        </div>
    )
}

export default ResponseBox
