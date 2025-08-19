'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    employee_number: '',
    employee_email: '',
    employee_dob: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Store employee data in sessionStorage
      if (data.employee) {
        sessionStorage.setItem('loggedInEmployee', JSON.stringify(data.employee));
      }

      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Employee Login</h2>

        {error && (
          <div className="alert alert-danger text-center py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="employee_number" className="form-label">Employee Number</label>
            <input
              type="text"
              name="employee_number"
              id="employee_number"
              value={form.employee_number}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="employee_email" className="form-label">Email</label>
            <input
              type="email"
              name="employee_email"
              id="employee_email"
              value={form.employee_email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="employee_dob" className="form-label">Date of Birth</label>
            <input
              type="date"
              name="employee_dob"
              id="employee_dob"
              value={form.employee_dob}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <p className="text-center mt-3 text-muted">
          Don’t have an account?{' '}
          <a href="/employee/add" className="text-decoration-none">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
