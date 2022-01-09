import { Product } from "../components"
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions/listProductsActions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Rating from '../components/Rating';



export const ProductListContainer = () => {

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

    return (
        <>
            <Carousel showArrows autoPlay showThumbs={false} infiniteLoop={true}>
                        <div>
                        <img src="assets/logo1.png" alt="logo1"/>
                    </div>
                    <div>
                        <img src="assets/logo2.png" alt="logo2"/>
                    </div>
                    <div>
                        <img src="assets/logo3.png" alt="logo3"/>
                    </div>
            </Carousel>
            <Product.SectionTitle>Just Dropped</Product.SectionTitle>
            {loading ? (
            <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                {products.length === 0 && <MessageBox>No Product Found Yet. Please Create One!</MessageBox>}
                <div>
                    <Product>
                    {products.data.content.map((product) => (
                        <Product.Card key={product.id}>
                        <Product.Discount>-10%</Product.Discount>
                        <Link to={`/product/${product.id}`}><Product.Image src={product.image_url}/></Link>
                        <Link to={`/product/${product.id}`}><Product.Title>{product.name}</Product.Title></Link>
                        <Rating
                        rating={Math.ceil(product.rating)}
                        ></Rating> 
                        <Product.Wrapper>
                            <Product.Price>{'$' + product.price.toFixed(2)}</Product.Price>
                            {/* <Product.Button>Add to Cart &nbsp;<i class="far fa-arrow-alt-circle-right"></i></Product.Button> */}
                        </Product.Wrapper>
                    </Product.Card>
                    ))}
                    </Product>
                </div>
                </>
            )}
            <Product.SectionTitle><Link to="search/category/all">View all Product</Link></Product.SectionTitle>
        </>
    )
}