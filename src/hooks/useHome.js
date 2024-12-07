import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../data';
import {
    changeNewsData, changeSearchQuery, changeSearchResult, changeLoading,
    changeSearchResultImages, changeSearchResultVideos, changeSearchResultNews
    , changeExterResponseLoading
} from '../redux/slice/searchSlice';
import { useNavigate } from 'react-router-dom';
const useHome = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [homeNewsLoading, setHomeNewsLoading] = useState(false);
    const [search, setSearch] = useState("");

    async function fetchNews() {
        try {
            setHomeNewsLoading(true)
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=5cd30a0c92d149999e76bf07386f9943`)
            const formateResponse = await response.json();
            dispatch(changeNewsData(formateResponse.articles));
            setHomeNewsLoading(false);
        } catch (error) {
            alert("unable to fetch data , reload the page again...")
            setHomeNewsLoading(false);
        }
    }

    async function fetchresult(query = search, type = null) {
        try {
            navigate(`/${search}`);
            dispatch(changeSearchQuery(search));
            const response = await fetch(`http://api.serpstack.com/search?access_key=${API}&query=${query}`);
            const formateResponse = await response.json();
            dispatch(changeSearchResult(formateResponse));
            dispatch(changeLoading(false));

            // now fetch the other data like images , videos , news
            dispatch(changeExterResponseLoading(true));

            // Create an array of promises for each fetch request
            const imageFetch = fetch(`http://api.serpstack.com/search?access_key=${API}&query=${query}&type=images`)
                .then(responseSearchImg => responseSearchImg.json())
                .then(formateResponseSearchImg => {
                    dispatch(changeSearchResultImages(formateResponseSearchImg));
                })
                .catch(error => {
                    console.error("Error fetching images:", error);
                    // Handle error if needed
                });

            const videoFetch = fetch(`http://api.serpstack.com/search?access_key=${API}&query=${query}&type=videos`)
                .then(responseSearchVideo => responseSearchVideo.json())
                .then(formateResponseSearchVideo => {
                    dispatch(changeSearchResultVideos(formateResponseSearchVideo));
                })
                .catch(error => {
                    console.error("Error fetching videos:", error);
                    // Handle error if needed
                });

            const newsFetch = fetch(`http://api.serpstack.com/search?access_key=${API}&query=${query}&type=news`)
                .then(responseSearchNews => responseSearchNews.json())
                .then(formateResponseSearchNews => {
                    dispatch(changeSearchResultNews(formateResponseSearchNews));
                })
                .catch(error => {
                    console.error("Error fetching news:", error);
                    // Handle error if needed
                });

            // Use Promise.all to wait for all fetch requests to complete
            Promise.all([imageFetch, videoFetch, newsFetch])
                .then(() => {
                    // All data has been fetched and stored in their respective slices
                    dispatch(changeExterResponseLoading(false));
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    // Ensure loading is false even on error
                    dispatch(changeExterResponseLoading(false));
                });
        } catch (error) {
            dispatch(changeSearchResult({}));
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchresult(search);
        }
    };

    return { homeNewsLoading, setHomeNewsLoading, handleKeyPress, fetchresult, fetchNews, setSearch, search };
}

export default useHome
