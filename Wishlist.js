
import React from 'react';
import { Table, Button } from 'react-bootstrap';

const Wishlist = ({ wishlistItems, removeFromWishlist }) => {
  return (
    <div className="container mt-3">
      <h2 className="text-center">My Wishlist</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>Rs {item.price}</td>
              <td>
                <Button variant="danger" onClick={() => removeFromWishlist(item.name)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Wishlist;
