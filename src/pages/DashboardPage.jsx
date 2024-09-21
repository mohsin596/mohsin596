import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const [clientData, setClientData] = useState([]);
  const [tenantData, setTenantData] = useState([]);
  const [showClientData, setShowClientData] = useState(false);
  const [showTenantData, setShowTenantData] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingTenants, setLoadingTenants] = useState(true);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to login page
  };

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/getdataclientsurvey', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setClientData(response.data.clientSurvey);
      } catch (err) {
        setError('Failed to fetch client data');
        console.error(err);
      } finally {
        setLoadingClients(false);
      }
    };

    const fetchTenantData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/getdatatenantsurvey', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setTenantData(response.data.tenantSurvey);
      } catch (err) {
        setError('Failed to fetch tenant data');
        console.error(err);
      } finally {
        setLoadingTenants(false);
      }
    };

    fetchClientData();
    fetchTenantData();
  }, []);

  return (
    <section className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {error && <div className="text-red-600">{error}</div>}

      <div className="flex space-x-4 mb-4">
        <button onClick={() => setShowClientData(!showClientData)} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Client Survey
        </button>
        <button onClick={() => setShowTenantData(!showTenantData)} className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
          Tenants
        </button>
        <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
          Logout
        </button>
      </div>

      {/* Client Data Table */}
      {showClientData && !loadingClients && clientData.length > 0 && (
        <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Client Survey Responses</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Submission Date</th>
                <th className="py-3 px-6 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {clientData.map((client) => (
                <tr key={client._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{client.name}</td>
                  <td className="py-3 px-6">{client.email}</td>
                  <td className="py-3 px-6">{client.date}</td>
                  <td className="py-3 px-6 text-center">
                    <Link to={`/ClientSurvey/${client._id}`} className="text-blue-500 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {loadingClients && <div>Loading client data...</div>}

      {/* Tenant Data Table */}
      {showTenantData && !loadingTenants && tenantData.length > 0 && (
        <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Tenants Survey Responses</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {tenantData.map((tenant) => (
                <tr key={tenant._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{tenant.name}</td>
                  <td className="py-3 px-6">{tenant.email}</td>
                  <td className="py-3 px-6 text-center">
                    <Link to={`/TenantsSurvey/${tenant._id}`} className="text-blue-500 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {loadingTenants && <div>Loading tenant data...</div>}
    </section>
  );
};

export default DashboardPage;
