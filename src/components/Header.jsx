import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom';
import Button from './Button';
import SearchBar from './SearchBar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function Header() {
    return (
        <nav className='header'>
            <Link to='/' className="logo_link">
                <h1 className="logo">GreenDay</h1>
            </Link>
            <SearchBar PlaceHolder='Search for products and more'/>
            <Button route='/'>Login</Button>  
            <Link to='/' className='cart_link'>
                <ShoppingCartIcon className='cart_Icon'/>
            </Link>
            <Link to='/' className='cart__link'>
                <span className='cart_text'>Cart</span>
            </Link>
        </nav>
    )
}

export default Header
