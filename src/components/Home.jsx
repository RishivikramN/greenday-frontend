import React,{useEffect} from 'react'
import axios from 'axios'
import Product from './Product'
import './Home.css'
import { useStateValue } from './StateProvider';
import { Icon } from '@material-ui/core';

const endpointURL="https://shielded-retreat-37573.herokuapp.com/api/products/";

function Home() {
    const [{products,search,sortType,sortClicked,isLoading},dispatch] = useStateValue();

    useEffect(()=>{
        async function fetchAPI(){
            dispatch({
                type:"IS_LOADING",
                item: 1
            });
            const result = await axios.get(endpointURL);
            dispatch({
                type: 'ADD_PRODUCTS',
                item: result.data
            });
            dispatch({
                type:"IS_LOADING",
                item: 0
            });
        }
        fetchAPI();        
    },[]);


    const handleSort=(isSort)=>{
        const sort = isSort==1?"asc":"desc";
        dispatch({
            type: "IS_SORTED",
            item: sort
        });
        dispatch({
            type:"IS_CLICKED",
            item: isSort
        });
    }
    
    const filteredProducts=products.filter(product=>{
        return product.title.toLowerCase().indexOf(search.toLowerCase())!==-1
    });
    
    const sorted = filteredProducts.sort((a,b)=>{
        return sortType==="asc"? (a.price-b.price):(b.price-a.price);
    });

    return (
        <React.Fragment>    
            <div className="sort_container">
                <button className="genbtn sort_btn" onClick={()=>handleSort(!sortClicked)}>
                    <div className="sort_container">
                        <span className="sort_span">Sort</span>
                        {sortType==="desc"?<Icon className="sort_arrow">arrow_upward</Icon>:<Icon className="sort_arrow">arrow_downward</Icon>}
                    </div>
                </button>
            </div>
            <div className='home_container'>
                    <div className="home_row">
                        { isLoading ? <h2 className="loading_class">Loading...</h2>:
                        sorted.map(product=>(
                            <Product key={product._id} title={product.title} review={product.review} offer={product.offer} price={product.price} image={product.image}/>
                        ))}
                        
                    </div>
            </div>
        </React.Fragment>
    );
}

export default Home
