import React,{useEffect} from 'react'
import axios from 'axios'
import Product from './Product'
import './Home.css'
import { useStateValue } from './StateProvider';
import { Icon } from '@material-ui/core';

const endpointURL="https://shielded-retreat-37573.herokuapp.com/api/products/";

function Home() {
    var [{products,search,sortType,sortClicked,isLoading,totalProducts,currentPage,loadMoreVisible},dispatch] = useStateValue();
    const maxProductInaPage = 6;

    useEffect(()=>{
        async function fetchAPI(){
            dispatch({
                type:"IS_LOADING",
                item: 1
            });
            const result = await axios.get(`${endpointURL}?sort=${sortType}`);
            const countresult = await axios.get(`${endpointURL}count`);
            dispatch({
                type: 'ADD_PRODUCTS',
                item: result.data
            });
            dispatch({
                type: "TOTAL_PRODUCTS",
                item: countresult.data.count
            })
            dispatch({
                type:"IS_LOADING",
                item: 0
            });
        }
        fetchAPI();        
    },[]);

    const handleSort=async(isSort)=>{
        dispatch({
            type:"SET_CURRENTPAGE",
            item: 1
        });
        dispatch({
            type:"IS_CLICKED",
            item: 1
        });
        dispatch({
            type: "IS_SORTED",
            item: 1
        });
        currentPage=1;
        const sort = isSort==1?1:-1;
        dispatch({
            type:"IS_LOADING",
            item: 1
        });
        if(currentPage< Math.ceil(totalProducts/maxProductInaPage)){
            dispatch({
                type:"SET_LOADMOREVISIBLE",
                item: 1
            });
        }
        const result = await axios.get(`${endpointURL}?filter=${search}&sort=${sort}`);
        dispatch({
            type:"ADD_PRODUCTS",
            item: result.data
        });
        dispatch({
            type:"IS_LOADING",
            item: 0
        });
        dispatch({
            type: "IS_SORTED",
            item: sort
        });
        dispatch({
            type:"IS_CLICKED",
            item: isSort
        });
    }

    const handlePagination = async()=>{
        var pageNumber; 

        if(currentPage+1== Math.ceil(totalProducts/maxProductInaPage)){
            pageNumber=currentPage+1;
            dispatch({
                type:"SET_LOADMOREVISIBLE",
                item: 0
            });
        }
        else if(currentPage+1< Math.ceil(totalProducts/maxProductInaPage)){
            pageNumber=currentPage+1;
            dispatch({
                type:"SET_LOADMOREVISIBLE",
                item: 1
            });
        }
        else{
            dispatch({
                type:"SET_LOADMOREVISIBLE",
                item: 1
            });
        }
        const result = await axios.get(`${endpointURL}?filter=${search}&page=${pageNumber}&sort=${sortType}`);
        dispatch({
            type:"SET_CURRENTPAGE",
            item: pageNumber
        });
        dispatch({
            type:"APPEND_PRODUCTS",
            item: result.data
        });
        
    }

    return (
        <React.Fragment>    
            <div className="sort_container">
                <button className="genbtn sort_btn" onClick={()=>handleSort(!sortClicked)}>
                    <div className="sort_container">
                        <span className="sort_span">Sort</span>
                        {sortType===1?<Icon className="sort_arrow">arrow_upward</Icon>:<Icon className="sort_arrow">arrow_downward</Icon>}
                    </div>
                </button>
            </div>
            <div className='home_container'>
                    <div className="home_row">
                        { isLoading ? <h2 className="loading_class">Loading...</h2>:
                        products.map(product=>(
                            <Product key={product._id} title={product.title} review={product.review} offer={product.offer} price={product.price} image={product.image}/>
                        ))}
                        
                    </div>
            </div>
            {loadMoreVisible==1?<button className="genbtn sort_btn" onClick={handlePagination}>
                <div className="sort_container">
                            <span className="sort_span">Load more</span>
                </div>
            </button>:null}
        </React.Fragment>
    );
}

export default Home
