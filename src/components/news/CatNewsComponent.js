import React, { useState } from 'react'

const CatNewsComponent = ({ name, description, url, category }) => {

    const imageUrlData = {
        business: "https://img.freepik.com/free-photo/3d-rendering-financial-neon-bull_23-2151691886.jpg?t=st=1729779780~exp=1729783380~hmac=c4e24d4b9003933c42d1f7f7e78fe617311f80af50ba31cbe84f74865553589d&w=1060",
        entertainment: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        health: "https://media.istockphoto.com/id/1346675635/photo/modern-medical-research-laboratory-portrait-of-latin-and-black-young-scientists-using.jpg?s=2048x2048&w=is&k=20&c=nlXTnte2yzGILzci1azgmg06e2M4-DUbZW_txtuTlxM=",
        sports: "https://media.gettyimages.com/id/1258273094/photo/topshot-chennai-super-kings-captain-mahendra-singh-dhoni-walks-back-to-the-pavilion-after-his.jpg?s=612x612&w=0&k=20&c=-iXtsb765VYiECE9sKUieTFTWvLpGjh7xnXgRGYTSGA=",
        science: "https://cdn.pixabay.com/photo/2019/08/06/22/48/artificial-intelligence-4389372_960_720.jpg",
        technology: "https://img.freepik.com/free-photo/ai-nuclear-energy-background-future-innovation-disruptive-technology_53876-129783.jpg?t=st=1729780129~exp=1729783729~hmac=62992ed2b4a991d3b3a11b23beb9776099c0924ec400bbce7111336ed06fc822&w=1060"
    }

    return (
        <div className='cursor-pointer relative flex flex-col gap-1 justify-start w-[90%] max-w-[400px] screen3:max-w-[457px] p-2 bg-[#00000080] rounded-lg h-[380px]'>
            <img src={imageUrlData[category]} className='aspect-auto w-full rounded-lg object-fit h-[150px] screen1:h-[200px]' alt={name} />
            <div className='w-full p-2'>
                <p className='text-[16px] screen3:text-[18px] mb-2'>{name}</p>
                <p className='text-[12px] screen3:text-[14px] text-[#b7b6b6] mb-2 mr-2'>{description} <span className='text-[#4786e4] text-[14px] hover:text-[#56d8fc]' onClick={() => { window.open(url, '_blank'); }}>read full article</span></p>
            </div>
        </div>
    )
}

export default CatNewsComponent
