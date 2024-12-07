import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { API } from '../data';

import {
    changeSearchQuery, changeSearchResult, changeLoading, changeSearchResultImages,
    changeSearchResultVideos, changeSearchResultNews, changeExterResponseLoading
} from '../redux/slice/searchSlice';
import { useSelector } from 'react-redux';

const useResponse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { searchQuery = '' } = useSelector((state) => state.searchSlice)
    const [search, setSearch] = useState(() => {
        if (searchQuery.length == 0) {
            const storedSearchQuery = localStorage.getItem('searchQuery');
            return storedSearchQuery ? storedSearchQuery : '';
        }
        else {
            return searchQuery;
        }
    });

    async function fetchresult(query = search) {
        try {
            dispatch(changeLoading(true));
            dispatch(changeSearchQuery(search));
            const response = await fetch(`http://api.serpstack.com/search?access_key=${API}&query=${query}`);
            const formateResponse = await response.json();
            dispatch(changeSearchResult(formateResponse));
            dispatch(changeLoading(false));
            navigate(`/${search}`);

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
            dispatch(changeLoading(false))
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchresult(search);
        }
    };

    return { handleKeyPress, search, setSearch, fetchresult }
}

export default useResponse
