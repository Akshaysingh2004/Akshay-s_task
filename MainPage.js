import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Badge,
  Spinner,
  Table,
  Form,
} from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Wishlist from "./Wishlist";

import OrderTracker from "./OrderTracker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = ({ handleSignOut }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false); 
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState("");

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen); 

  const getPosts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const addToCart = (itemName, itemPrice) => {
    const existingItem = cartItems.find((item) => item.name === itemName);
    if (existingItem) {
      existingItem.quantity++;
      setCartItems([...cartItems]);
    } else {
      setCartItems([
        ...cartItems,
        { name: itemName, quantity: 1, price: itemPrice },
      ]);
    }
  };

  const removeFromCart = (itemName) => {
    const confirmation = window.confirm(
      `Are you sure you want to remove ${itemName} from the cart?`
    );
    if (confirmation) {
      const updatedCart = cartItems.filter((item) => item.name !== itemName);
      setCartItems(updatedCart);
    }
  };

  const updateCartItemQuantity = (itemName, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.name === itemName) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const addToWishlist = (itemName, itemPrice) => {
    setWishlistItems([...wishlistItems, { name: itemName, price: itemPrice }]);
  };

  const removeFromWishlist = (itemName) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.name !== itemName
    );
    setWishlistItems(updatedWishlist);
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Please add items to the cart before placing an order.");
      return;
    }
    if (shippingAddress.trim() === "") {
      alert("Please enter your shipping address.");
      return;
    }

    const newOrder = {
      id: orders.length + 1,
      items: cartItems,
      shippingAddress: shippingAddress,
      status: "Placed",
      trackingId: Math.floor(Math.random() * 1000000),
    };
    setOrders([...orders, newOrder]);
    setCartItems([]);
    setShippingAddress("");
    setIsCartOpen(false);

    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const calculateGrandTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container>
      <Button variant="danger" onClick={handleSignOut} className="m-2 ">
        Sign Out
      </Button>
      <h2 className="text-center text-dark fw-bold">MY ITEMS</h2>
      <div className="d-flex justify-content-end mt-3">
        <Button variant="success" className="mb-4" onClick={toggleCart}>
          View Cart
        </Button>
        <Button variant="info" className="ms-2 mb-4" onClick={toggleWishlist}>
          View Wishlist
        </Button>
      </div>

      
      {isLoading && (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <Row>
        {posts.map((post) => (
          <Col md="4" key={post.id}>
            <Card
              style={{
                width: "20rem",
                height: "32rem",
                margin: "0 10px 20px 10px",
              }}
            >
              <Card.Img
                variant="top"
                src={post.thumbnail}
                alt="Product Thumbnail"
                style={{ height: "10rem" }}
              />
              <Card.Body className="bg-info">
                <Card.Title className="fw-bold">{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <div>
                  <span>Price:</span>
                  <Badge bg="danger">Rs {post.price}</Badge>
                </div>
              </Card.Body>
              <Button
                variant="success"
                onClick={() => addToCart(post.title, post.price)}
              >
                Add to Cart
              </Button>
              <Button
                variant="info"
                className="mt-2"
                onClick={() => addToWishlist(post.title, post.price)}
              >
                Add to Wishlist
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      
      <Modal show={isWishlistOpen} onHide={toggleWishlist} centered>
        <Modal.Header closeButton>
          <Modal.Title>Wishlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Wishlist
            wishlistItems={wishlistItems}
            removeFromWishlist={removeFromWishlist}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={toggleWishlist}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

  
      <Modal show={isCartOpen} onHide={toggleCart} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartItemQuantity(
                          item.name,
                          parseInt(e.target.value)
                        )
                      }
                      min="1"
                    />
                  </td>
                  <td>Rs {item.price}</td>
                  <td>Rs {item.price * item.quantity}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => removeFromCart(item.name)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        
          <div className="text-end mt-3">
            <h5>Total: Rs {calculateGrandTotal()}</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group controlId="formShippingAddress">
            <Form.Label className="text-success fw-bold">Enter Shipping Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter shipping address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" onClick={handlePlaceOrder}>
            Place Order
          </Button>
          <Button variant="dark" onClick={toggleCart}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <OrderTracker orders={orders} setOrders={setOrders} />

      <ToastContainer />
    </Container>
  );
};

export default MainPage;
