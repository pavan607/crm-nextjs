// hooks/useEmployeeSession.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Employee {
  employee_id: number;
  employee_number: string;
  employee_email: string;
  employee_first_name: string;
  employee_last_name: string;
}

export const useEmployeeSession = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadEmployee = () => {
      try {
        const employeeData = sessionStorage.getItem('loggedInEmployee');
        if (employeeData) {
          setEmployee(JSON.parse(employeeData));
        }
      } catch (error) {
        console.error('Error loading employee session:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('loggedInEmployee');
    setEmployee(null);
    router.push('/login');
  }, [router]);

  const requireAuth = useCallback(() => {
    if (!loading && !employee) {
      router.push('/login');
      return false;
    }
    return true;
  }, [loading, employee, router]);

  return {
    employee,
    loading,
    logout,
    requireAuth,
    isLoggedIn: !!employee,
  };
};