import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Product.css';
import add from "../../assets/images/addCounter.png";
import placeholderImage from "../../assets/images/no-image.png";
import { CartContext } from '../../utils/CartContext';
import counterMinus from "../../assets/images/smallMinus.png";
import Loader from '../../components/common/Loader/Loader';
import { AuthContext } from '../../utils/AuthContext';
import { createCartAPI, updateCartAPI, addCartAPI, deleteCartAPI, getCartAPI } from '../../api/cart';
import Toaster from '../../components/common/Toaster/Toaster';

const ProductCard = ({ product, openCartPopup }) => {
    const { id, name, image, price } = product;
    const { cartItems, updateCartItems, refreshCart } = useContext(CartContext);
    const [count, setCount] = useState(0);
    const [incrementButtonLoading, setIncrementButtonLoading] = useState(false);
    const [decrementButtonLoading, setDecrementButtonLoading] = useState(false);
    const { loginResponse } = useContext(AuthContext);
    const [toaster, setToaster] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCounter()
    }, []);

    useEffect(() => {
        setCounter()
    }, [cartItems]);

    const setCounter = () => {
        let cartCount = 0;
        if (cartItems) {
            const existingCartItems = cartItems;
            const existingCartItemIndex = existingCartItems.items.findIndex(
                (item) => item.productVariantId === product.variantIds[0]
            );
            if (existingCartItemIndex !== -1) {
                cartCount = existingCartItems.items[existingCartItemIndex]?.quantity;
            }
        }
        setCount(cartCount);
    };


    const handleCountChange = (event, amount, state) => {
        event.preventDefault();
        const newCount = count + amount;
        let cartPayload = {
            storeId: 1,
            items: [
                {
                    productVariantId: product.variantIds[0],
                    quantity: newCount,
                    price: Number(newCount * product?.price),
                    name: product?.name,
                    image: product?.image,
                },
            ],
        };
        if (loginResponse) {
            cartPayload['customerId'] = loginResponse.id;
        }

        if (!cartItems) {
            createCart(cartPayload);
        } else {
            handleCartItemUpdate(cartItems, product.variantIds[0], newCount);
        }

        setCount((prevCount) => prevCount + amount);
    };

    const handleCartItemUpdate = (existingCartItems, provariantId, count) => {
        const existingCartItemIndex = existingCartItems.items.findIndex(
            (item) => item.productVariantId === provariantId
        );
        if (existingCartItemIndex !== -1) {
            const updatedCartItems = { ...existingCartItems };
            const updatedItem = {
                ...updatedCartItems.items[existingCartItemIndex],
                quantity: count,
                price: Number(product.price),
                name: product.name,
                image: product?.image
            };

            if (updatedItem.quantity === 0) {
                updatedCartItems.items.splice(existingCartItemIndex, 1);
                updatedItem.quantity = 1;
                updatedItem.price = 1;
                deleteItemCart(updatedCartItems.id, updatedItem, existingCartItemIndex);
            } else {
                updatedCartItems.items[existingCartItemIndex] = updatedItem;
                updateCartItem(updatedCartItems.id, updatedItem, existingCartItemIndex);
            }
        } else {
            if (count > 0) {
                const newCartItem = {
                    productVariantId: provariantId,
                    quantity: count,
                    price: product.price,
                    name: product.name,
                    image: product?.image,
                };
                existingCartItems.items.push(newCartItem);
                addCartItem(existingCartItems.id, existingCartItems, newCartItem);
            }
        }
    };

    const createCart = async (cartPayload) => {
        try {
            setIsLoading(true);
            const response = await createCartAPI(cartPayload);
            console.log('cart response:', response);
            if (response.succeeded) {
                getCart(response.data);
            } else {
                handleError(response.Message || 'Cart add failed');
            }
        } catch (error) {
            handleError('Cart add failed');
        }
    };

    const getCart = async (cart) => {
        try {
            setIsLoading(true);
            const response = await getCartAPI(cart.id);
            console.log('cart response:', response);
            if (response.succeeded) {
                setIsLoading(false);
                openCartPopup();
                handleSuccess('Product added into cart successfully');
                updateCartItems(response.data);
            } else {
                handleError(response.Message || 'Cart add failed');
            }
        } catch (error) {
            handleError('Cart add failed');
        }
    };

    const addCartItem = async (cartId, existingCartItems, newCartItem) => {
        try {
            setIsLoading(true);
            const response = await addCartAPI(cartId, newCartItem);
            console.log('cart update response:', response);
            if (response.succeeded) {
                handleSuccess('Product added into cart successfully');
                updateCartItems(existingCartItems);
                openCartPopup();
                setIsLoading(false);
            } else {
                handleError(response.Message || 'Cart add failed');
            }
        } catch (error) {
            handleError('Cart add failed');
        }
    };

    const updateCartItem = async (cartId, updatedItem, index) => {
        try {
            setIsLoading(true);
            const response = await updateCartAPI(cartId, updatedItem);
            console.log('cart update response:', response);
            if (response.succeeded) {
                handleSuccess('Product updated into cart successfully');
                cartItems.items[index] = updatedItem;
                updateCartItems(cartItems);
                openCartPopup();
                setIsLoading(false);
            } else {
                handleError(response.Message || 'Cart update failed');
            }
        } catch (error) {
            handleError('Cart update failed');
        }
    };

    const deleteItemCart = async (cartId, deletedItem, index) => {
        try {
            const response = await deleteCartAPI(cartId, deletedItem);
            console.log('cart delete response:', response);
            if (response.succeeded) {
                handleSuccess('Product deleted from cart successfully');
                cartItems.items.splice(index, 1);
                updateCartItems(cartItems);
                openCartPopup();
            } else {
                handleError(response.Message || 'Cart delete failed');
            }
        } catch (error) {
            handleError('Cart delete failed');
        }
    };

    const handleSuccess = (successMessage) => {
        setIncrementButtonLoading(false);
        setDecrementButtonLoading(false);
        //setToaster({ type: 'success', message: successMessage, duration: 3000 });
    };

    const handleError = (errorMessage) => {
        setIncrementButtonLoading(false);
        setDecrementButtonLoading(false);
        setToaster({ type: 'error', message: errorMessage, duration: 3000 });
    };

    const handleToasterClose = () => {
        setToaster(null);
    };

    const productImage = image ? `data:image/png;base64,${image}` : placeholderImage;

    return (
        <div className='indProduct'>
             {isLoading ? <Loader showOverlay={true} size={30} color="#fff" isLoading={false} /> : ''}
            <Link to={`/product/${id}`} className="product-link" style={{ display: 'inline' }}>
                <span className='produtImage'>
                    <img src={productImage} alt={name} className="product-image" />
                    <span className="counterWraper">
                        <span className="plusCounter" onClick={(e) => handleCountChange(e, 1, 'increment')}>
                            {incrementButtonLoading ? <Loader showOverlay={false} size={12} color="#000" isLoading={false} /> : <img src={add} alt="" />}
                        </span>
                        {count > 0 && (
                            <>
                                <span className="counterInput">
                                    <input type="number" className="inputCounter" value={count} readOnly />
                                </span>
                                <span className="minusCounter" onClick={(e) => handleCountChange(e, -1, 'decrement')}>
                                    {decrementButtonLoading ? <Loader showOverlay={false} size={12} color="#000" isLoading={false} /> : <img src={counterMinus} alt="" />}
                                </span>
                            </>
                        )}

                    </span>
                </span>
                <span className='productInfoDetails'>
                    <h5>{name}</h5>
                    <p>{price} SAR</p>
                </span>
            </Link>
            {toaster && (
                <Toaster
                    type={toaster.type}
                    message={toaster.message}
                    duration={toaster.duration}
                    onClose={handleToasterClose}
                />
            )}
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        price: PropTypes.number.isRequired
    }).isRequired
};

export default ProductCard;
