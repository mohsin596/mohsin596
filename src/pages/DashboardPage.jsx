import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const [clientData, setClientData] = useState([]);
  const [tenantData, setTenantData] = useState([]);
  const [showClientData, setShowClientData] = useState(false);
  const [showTenantData, setShowTenantData] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingTenants, setLoadingTenants] = useState(true);
  const [error, setError] = useState("");
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [tenantSearchTerm, setTenantSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://survey.mangotech-api.com/GetDataClientSurvey",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClientData(response.data.clientSurvey);
      } catch (err) {
        setError("Failed to fetch client data");
        console.error(err);
      } finally {
        setLoadingClients(false);
      }
    };

    const fetchTenantData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://survey.mangotech-api.com/GetDataTenantSurvey",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTenantData(response.data.tenantSurvey);
      } catch (err) {
        setError("Failed to fetch tenant data");
        console.error(err);
      } finally {
        setLoadingTenants(false);
      }
    };

    fetchClientData();
    fetchTenantData();
  }, []);

  const filteredClients = clientData.filter(client => {
    return (
      (client.name && client.name.toLowerCase().includes(clientSearchTerm.toLowerCase())) ||
      (client.email && client.email.toLowerCase().includes(clientSearchTerm.toLowerCase()))
    );
  });

  const filteredTenants = tenantData.filter(tenant => {
    return (
      (tenant.name && tenant.name.toLowerCase().includes(tenantSearchTerm.toLowerCase())) ||
      (tenant.email && tenant.email.toLowerCase().includes(tenantSearchTerm.toLowerCase()))
    );
  });

  const highlightSearchTerm = (text, searchTerm) => {
    if (!text) return text; 
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">{part}</span>
      ) : part
    );
  };

  return (
    <section className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <img
        src={require("../Images/pic.jpg")}
        alt="Login Icon"
        className="w-25 h-25 mb-10"
      />
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {error && <div className="text-red-600">{error}</div>}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => {
            setShowClientData(!showClientData);
            setShowTenantData(false);
          }}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Client Survey
        </button>
        <button
          onClick={() => {
            setShowTenantData(!showTenantData);
            setShowClientData(false);
          }}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Tenants
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Client Data Table */}
      {showClientData && !loadingClients && (
        <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Client Survey Responses</h2>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={clientSearchTerm}
              onChange={(e) => setClientSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          {filteredClients.length > 0 ? (
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
                {filteredClients.map((client) => (
                  <tr
                    key={client._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6">{highlightSearchTerm(client.name, clientSearchTerm)}</td>
                    <td className="py-3 px-6">{highlightSearchTerm(client.email, clientSearchTerm)}</td>
                    <td className="py-3 px-6">{client.date}</td>
                    <td className="py-3 px-6 text-center">
                      <Link
                        to={`/ClientSurvey/${client._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-500 text-center mt-4">No data available</div>
          )}
        </div>
      )}
      {loadingClients && <div>Loading client data...</div>}

      {/* Tenant Data Table */}
      {showTenantData && !loadingTenants && (
        <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tenants Survey Responses</h2>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={tenantSearchTerm}
              onChange={(e) => setTenantSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          {filteredTenants.length > 0 ? (
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
                {filteredTenants.map((tenant) => (
                  <tr
                    key={tenant._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6">{highlightSearchTerm(tenant.name, tenantSearchTerm)}</td>
                    <td className="py-3 px-6">{highlightSearchTerm(tenant.email, tenantSearchTerm)}</td>
                    <td className="py-3 px-6">{tenant.date}</td>
                    <td className="py-3 px-6 text-center">
                      <Link
                        to={`/TenantsSurvey/${tenant._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-500 text-center mt-4">No data available</div>
          )}
        </div>
      )}
      {loadingTenants && <div>Loading tenant data...</div>}
    </section>
  );
};

export default DashboardPage;
