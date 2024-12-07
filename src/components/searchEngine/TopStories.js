import React from 'react'

const TopStories = ({ value }) => {
    return (
        <div className='min-w-[260px] bg-[#0c1729d4] rounded-lg h-[200px] p-4 screen2:text-[16px] max-w-[300px]'>
            <p >{value.title.substring(0, 150)}...</p>
        </div>
    )
}

export default TopStories
