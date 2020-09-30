import React from 'react'
import './Product.css'

function Product({id,title,price,review,offer,image}) {
    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_review">
                    {
                        Array(review)
                        .fill()
                        .map(index=>(
                            <span key={index}>⭐</span>
                        ))
                    }
                </div>
                <p className="product_offer">
                    {`${offer}% Off`}
                </p>
            </div>
            <img src={image} alt=""/>
        </div>
    )
}

export default Product
