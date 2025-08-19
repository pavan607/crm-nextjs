'use client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useCallback } from 'react';
import { Button, Card, Form, Row, Col, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import Select from 'react-select';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Type definitions
interface Sale {
  id: number;
  date: string;
  client: string;
  product: string;
  quantity: number;
}

interface Customer {
  customer_id: number;
  customer_name: string;
}

interface Product {
  product_id: number;
  product_name: string;
}

export default function ProductSalesPage() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [client, setClient] = useState<string[]>([]);
  const [product, setProduct] = useState<string[]>([]);
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false); // SSR safety flag

  useEffect(() => {
    setIsClient(true);
    const defaultFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16);
    const defaultTo = new Date().toISOString().slice(0, 16);
    setFromDate(defaultFrom);
    setToDate(defaultTo);
  }, []);

  const handleFilter = useCallback(async () => {
    const buildQuery = () => {
      const params = new URLSearchParams();
      params.append('from', fromDate);
      params.append('to', toDate);
      client.forEach((c) => params.append('client', c));
      product.forEach((p) => params.append('product', p));
      return params.toString();
    };

    try {
      const res = await fetch(`/api/sales?${buildQuery()}`);
      const data = await res.json();
      setSalesData(data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  }, [fromDate, toDate, client, product]);

  const handleExport = () => {
    const csv = [
      ['Date', 'Client', 'Product', 'Quantity'],
      ...salesData.map((s) => [s.date, s.client, s.product, s.quantity]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'product_sales.csv';
    link.click();
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [custRes, prodRes] = await Promise.all([
          fetch('/api/customers'),
          fetch('/api/products'),
        ]);
        const customers = await custRes.json();
        const products = await prodRes.json();
        setCustomerList(customers);
        setProductList(products);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      handleFilter();
    }
  }, [fromDate, toDate, client, product, handleFilter]);

  const productTotals: { [product: string]: number } = {};
  salesData.forEach((sale) => {
    productTotals[sale.product] = (productTotals[sale.product] || 0) + sale.quantity;
  });

  const chartData = {
    labels: Object.keys(productTotals),
    datasets: [
      {
        label: 'Total Quantity Sold',
        data: Object.values(productTotals),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Quantity' },
      },
      x: {
        title: { display: true, text: 'Product' },
      },
    },
  };

  return (
    <div className="p-4">
      <h3>Product Sales Report</h3>

      <Card className="mt-3">
        <Card.Header><strong>Filters</strong></Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="fromDate">
                  <Form.Label>From date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="toDate">
                  <Form.Label>To date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {isClient && (
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="client">
                    <Form.Label>Customers</Form.Label>
                    <Select
                      options={customerList.map((c) => ({
                        value: c.customer_name,
                        label: c.customer_name,
                      }))}
                      value={client.map((c) => ({ value: c, label: c }))}
                      onChange={(selected) =>
                        setClient(selected ? selected.map((s) => s.value) : [])
                      }
                      isClearable
                      isMulti
                      placeholder="Select Customers"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="product">
                    <Form.Label>Products</Form.Label>
                    <Select
                      options={productList.map((p) => ({
                        value: p.product_name,
                        label: p.product_name,
                      }))}
                      value={product.map((p) => ({ value: p, label: p }))}
                      onChange={(selected) =>
                        setProduct(selected ? selected.map((s) => s.value) : [])
                      }
                      isClearable
                      isMulti
                      placeholder="Select Products"
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}

            <div className="d-flex justify-content-end gap-2">
              <Button variant="primary" onClick={handleFilter}>
                Filter
              </Button>
              <Button variant="success" onClick={handleExport}>
                Export to CSV
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Table */}
      <Card className="mt-4">
        <Card.Header><strong>Sales Data</strong></Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Product</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {salesData.length === 0 ? (
                <tr><td colSpan={4} className="text-center text-muted">No records found.</td></tr>
              ) : (
                salesData.map((sale, index) => (
                  <tr key={`${sale.id}-${sale.product}-${index}`}>
                    <td>{new Date(sale.date).toLocaleString()}</td>
                    <td>{sale.client}</td>
                    <td>{sale.product}</td>
                    <td>{sale.quantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Chart */}
      <Card className="mt-4">
        <Card.Header><strong>Sales Chart</strong></Card.Header>
        <Card.Body>
          {salesData.length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p className="text-center text-muted">No data to display chart.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
