'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card, Table } from 'react-bootstrap';
import Select from 'react-select';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Sale {
  id: number;
  date: string;
  client: string;
  product: string;
  quantity: number;
  value: number;
}

interface Customer {
  customer_id: number;
  customer_name: string;
}

interface Product {
  product_id: number;
  product_name: string;
}

export default function ProductSalesReport() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [clients, setClients] = useState<string[]>([]);
  const [products, setProducts] = useState<string[]>([]);
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [isClient, setIsClient] = useState(false); // hydration fix

  useEffect(() => {
    setIsClient(true); // ensures client-only rendering
  }, []);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [custRes, prodRes] = await Promise.all([
          fetch('/api/customers'),
          fetch('/api/products'),
        ]);
        const [custData, prodData] = await Promise.all([
          custRes.json(),
          prodRes.json(),
        ]);
        setCustomerList(custData);
        setProductList(prodData);
      } catch (err) {
        console.error('Failed to fetch filter data:', err);
      }
    };
    fetchFilters();
  }, []);

  const handleFilter = async () => {
    const params = new URLSearchParams();
    if (fromDate) params.append('from', fromDate);
    if (toDate) params.append('to', toDate);
    clients.forEach(c => params.append('client', c));
    products.forEach(p => params.append('product', p));

    try {
      const res = await fetch(`/api/sales-value?${params}`);
      const data = await res.json();
      setSales(data);
    } catch (err) {
      console.error('Error fetching sales:', err);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Date', 'Client', 'Product', 'Quantity', 'Value'],
      ...sales.map(s => [
        new Date(s.date).toLocaleString(),
        s.client,
        s.product,
        s.quantity.toString(),
        s.value.toFixed(2),
      ]),
    ]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sales_report.csv';
    link.click();
  };

  const productTotals: { [key: string]: { quantity: number; value: number } } = {};
  sales.forEach(({ product, quantity, value }) => {
    if (!productTotals[product]) productTotals[product] = { quantity: 0, value: 0 };
    productTotals[product].quantity += quantity;
    productTotals[product].value += value;
  });

  const totalQuantity = sales.reduce((acc, sale) => acc + sale.quantity, 0);
  const totalSoldValue = sales.reduce((acc, sale) => acc + sale.value, 0);

  const chartData = {
    labels: Object.keys(productTotals),
    datasets: [
      {
        label: 'Quantity',
        data: Object.values(productTotals).map(p => p.quantity),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
      {
        label: 'Value',
        data: Object.values(productTotals).map(p => p.value),
        backgroundColor: 'rgba(255,99,132,0.6)',
      },
    ],
  };

  return (
    <div className="p-4">
      <h3>Product Sales Quantity and Value Report</h3>

      <Card className="mt-3">
        <Card.Header><strong>Filters</strong></Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Customers</Form.Label>
                {isClient && (
                  <Select
                    isMulti
                    options={customerList.map(c => ({
                      value: c.customer_name,
                      label: c.customer_name,
                    }))}
                    value={clients.map(c => ({ value: c, label: c }))}
                    onChange={selected => setClients(selected.map(s => s.value))}
                  />
                )}
              </Col>
              <Col md={6}>
                <Form.Label>Products</Form.Label>
                {isClient && (
                  <Select
                    isMulti
                    options={productList.map(p => ({
                      value: p.product_name,
                      label: p.product_name,
                    }))}
                    value={products.map(p => ({ value: p, label: p }))}
                    onChange={selected => setProducts(selected.map(s => s.value))}
                  />
                )}
              </Col>
            </Row>
            <div className="d-flex justify-content-end gap-2">
              <Button onClick={handleFilter} variant="primary">Filter</Button>
              <Button onClick={handleExport} variant="success">Export to CSV</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Table */}
      <Card className="mt-4">
        <Card.Header><strong>Sales Data</strong></Card.Header>
        <Card.Body>
          {sales.length > 0 && (
            <div className="mb-3">
              <p><strong>Total Quantity Sold:</strong> {totalQuantity}</p>
              <p><strong>Total Sold Value:</strong> ₹{totalSoldValue.toFixed(2)}</p>
            </div>
          )}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 ? (
                <tr><td colSpan={5} className="text-center">No records found</td></tr>
              ) : (
                sales.map((s, idx) => (
                  <tr key={idx}>
                    <td suppressHydrationWarning>{new Date(s.date).toLocaleString()}</td>
                    <td>{s.client}</td>
                    <td>{s.product}</td>
                    <td>{s.quantity}</td>
                    <td>{s.value.toFixed(2)}</td>
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
          {isClient && sales.length > 0 ? (
            <>
              <Bar data={chartData} options={{ responsive: true }} />
              <div className="mt-3">
                <p><strong>Total:</strong> {totalQuantity} units | ₹{totalSoldValue.toFixed(2)}</p>
              </div>
            </>
          ) : (
            <p className="text-muted text-center">No chart data available.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
