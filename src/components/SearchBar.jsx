import React from 'react';
import './SearchBar.css';
import SearchIcon from '@material-ui/icons/Search';
import { useStateValue } from './StateProvider';

function SearchBar({PlaceHolder}) {
    const [{search},dispatch] = useStateValue();

    const handleOnChange = (e)=>{
        dispatch({
            type: 'ADD_SEARCH_INPUT',
            item: e.target.value
        })
    }

    return (
        <div className='header_search'>
                <input type='text' placeholder={PlaceHolder} className='header__searchInput' onChange={handleOnChange}/>
                <SearchIcon className='header__searchIcon'/>
        </div>
    )
}

export default SearchBar
