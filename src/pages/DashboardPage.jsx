import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [clientData, setClientData] = useState([]);
  const [tenantData, setTenantData] = useState([]);
  const [showClientData, setShowClientData] = useState(false);
  const [showTenantData, setShowTenantData] = useState(false);

  const handleClientSurveyClick = () => {
    const fetchedClientData = [
      { id: 1, name: 'Alice', email: 'Alice@example.com', submissionDate: '22/10/2020' },
      { id: 2, name: 'Bob', email: 'Bob@example.com', submissionDate: '22/10/2020' },
    ];
    setClientData(fetchedClientData);
    setShowClientData(!showClientData); // Toggle visibility
    if (showTenantData) setShowTenantData(false); // Hide tenant data if it was shown
  };

  const handleTenantSurveyClick = () => {
    const fetchedTenantData = [
      { id: 1, name: 'Martha', email: 'martha@gmail.com', submissionDate: '22/10/2020' },
      { id: 2, name: 'William', email: 'william@example.com', submissionDate: '22/10/2020' },
    ];
    setTenantData(fetchedTenantData);
    setShowTenantData(!showTenantData); // Toggle visibility
    if (showClientData) setShowClientData(false); // Hide client data if it was shown
  };

  return (
    <section className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleClientSurveyClick}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Client Survey
        </button>
        <button
          onClick={handleTenantSurveyClick}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Tenants
        </button>
      </div>

      <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-lg">
        {showClientData && clientData.length > 0 && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Client Survey Responses</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Submission Date</th>
                  <th className="py-3 px-6 text-center">Details</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {clientData.map((client) => (
                  <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{client.name}</td>
                    <td className="py-3 px-6">{client.email}</td>
                    <td className="py-3 px-6">{client.submissionDate}</td> {/* Display submission date */}

                    <td className="py-3 px-6 text-center">
                      <Link to={`/ClientSurvey/${client.id}`} className="text-blue-500 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showTenantData && tenantData.length > 0 && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tenants Survey Responses</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Submission Date</th> {/* Add Submission Date for tenants */}
                  <th className="py-3 px-6 text-center">Details</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {tenantData.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{tenant.name}</td>
                    <td className="py-3 px-6">{tenant.email}</td>
                    <td className="py-3 px-6">{tenant.submissionDate}</td> {/* Display submission date for tenants */}
                    <td className="py-3 px-6 text-center">
                      <Link to={`/TenantsSurvey/${tenant.id}`} className="text-blue-500 hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
