'use client';

import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';

interface Product {
  product_id: string | number;
  product_name: string;
}

interface Customer {
  customer_id: string;
  customer_name: string;
  customer_gst_num: string;
}

interface OrderItem {
  productId: string | number;
  itemName: string;
  quantity: number;
  unit_price: number;
}

export default function OrderPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState('');
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalPrice, setModalPrice] = useState<number>(0);

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => setCustomers(data));
  }, []);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddItem = (product: Product, quantity: number, price: number) => {
    const existing = orderItems.find(item => item.productId === product.product_id);
    if (!existing) {
      const newItem: OrderItem = {
        productId: product.product_id,
        itemName: product.product_name,
        quantity: quantity,
        unit_price: price,
      };
      setOrderItems(prev => [...prev, newItem]);
    } else {
      alert("Product already added.");
    }

    // Reset modal
    setSelectedProductId('');
    setModalQuantity(1);
    setModalPrice(0);
    setShowModal(false);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updated = [...orderItems];
    updated[index].quantity = quantity;
    setOrderItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...orderItems];
    updated.splice(index, 1);
    setOrderItems(updated);
  };

  const handleSubmit = async () => {
    const orderData = {
      customer_id: selectedCustomerId,
      items: orderItems,
    };

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      alert('Order submitted successfully!');
      setSelectedCustomerId('');
      setOrderItems([]);
    } else {
      alert('Failed to submit order');
    }
  };

  return (
    <div className="p-4">
      <h2>Customer Order</h2>

      <Form.Group className="mb-3">
        <Form.Label>Select Customer</Form.Label>
        <Form.Select
          value={selectedCustomerId}
          onChange={e => setSelectedCustomerId(e.target.value)}
        >
          <option value="">-- Select Customer --</option>
          {customers.map(customer => (
            <option key={customer.customer_id} value={customer.customer_id}>
              {customer.customer_name} ({customer.customer_gst_num})
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Product
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item, index) => (
            <tr key={item.productId}>
              <td>{item.itemName}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const parsed = parseInt(e.target.value);
                    if (!isNaN(parsed)) {
                      handleQuantityChange(index, parsed);
                    }
                  }}
                />
              </td>
              <td>₹ {item.unit_price.toFixed(2)}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button
        variant="success"
        onClick={handleSubmit}
        disabled={!selectedCustomerId || orderItems.length === 0}
      >
        Submit Order
      </Button>

      {/* Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                <option value="">-- Select Product --</option>
                {products.map((product) => (
                  <option key={product.product_id} value={product.product_id.toString()}>
                    {product.product_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={modalQuantity}
                onChange={(e) => setModalQuantity(parseInt(e.target.value) || 1)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Unit Price (₹)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={modalPrice}
                onChange={(e) => setModalPrice(parseFloat(e.target.value) || 0)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => {
                const selectedProduct = products.find(
                  (p) => p.product_id.toString() === selectedProductId
                );
                if (selectedProduct) {
                  if (modalPrice <= 0) {
                    alert("Please enter a valid unit price.");
                    return;
                  }
                  handleAddItem(selectedProduct, modalQuantity, modalPrice);
                } else {
                  alert("Please select a valid product.");
                }
              }}
              disabled={!selectedProductId}
            >
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
