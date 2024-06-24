import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

const OrderTracker = ({ orders, setOrders }) => {
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const cancelOrder = (orderId) => {
    const confirmation = window.confirm(
      `Are you sure you want to cancel order ID: ${orderId}?`
    );
    if (confirmation) {
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
    }
  };

  return (
    <>
      {orders.length > 0 ? (
        <div className="mt-5">
          <h2 className="text-center">My Orders</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Shipping Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>{item.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{order.shippingAddress}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.status === "Placed" && (
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() =>
                          updateOrderStatus(order.id, "Processing")
                        }
                      >
                        Start Processing
                      </Button>
                    )}
                    {order.status === "Processing" && (
                      <>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() =>
                            updateOrderStatus(order.id, "Dispatched")
                          }
                        >
                          Dispatch
                        </Button>{" "}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => cancelOrder(order.id)}
                          className="ms-2"
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {order.status === "Dispatched" && (
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "Delivered")}
                      >
                        Deliver
                      </Button>
                    )}
                    {order.status === "Delivered" && (
                      <Button variant="secondary" size="sm" disabled>
                        Delivered
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default OrderTracker;
