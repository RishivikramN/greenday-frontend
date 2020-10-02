import React from 'react';
import './SearchBar.css';
import SearchIcon from '@material-ui/icons/Search';
import { useStateValue } from './StateProvider';
import axios from 'axios';

const endpointURL="https://shielded-retreat-37573.herokuapp.com/api/products/";

function SearchBar({PlaceHolder}) {
    const [{search},dispatch] = useStateValue();

    const handleOnChange = async()=>{
        dispatch({
            type:"IS_LOADING",
            item: 1
        });
        const result = await axios.get(`${endpointURL}?filter=${search}`);

        dispatch({
            type:"IS_LOADING",
            item: 0
        });
        dispatch({
            type:"ADD_PRODUCTS",
            item: result.data
        })
        dispatch({
            type:"SET_LOADMOREVISIBLE",
            item: 1
        });
        dispatch({
            type:"SET_CURRENTPAGE",
            item: 1
        });
    }

    const handleEnterKey = (e)=>{
        if (e.keyCode === 13) {
            handleOnChange();
            dispatch({
                type:"IS_CLICKED",
                item: 1
            });
            dispatch({
                type: "IS_SORTED",
                item: 1
            });
        }
    }

    const handleInputUpdate = (e)=>{
        dispatch({
            type: 'ADD_SEARCH_INPUT',
            item: e.target.value
        })
    }

    return (
        <div className='header_search'>
                <input type='text' placeholder={PlaceHolder} className='header__searchInput' onKeyDown={handleEnterKey} onChange={handleInputUpdate}/>
                <SearchIcon className='header__searchIcon'/>
        </div>
    )
}

export default SearchBar
