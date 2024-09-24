import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TenantsFormPage = () => {
  const { tenantId } = useParams();  // Get tenantId from URL parameters
  const [formData, setFormData] = useState(null);  // Store fetched tenant data
  const [error, setError] = useState(null);  // Store any errors
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenantsData = async () => {
      try {
        const token = localStorage.getItem('token');  // Retrieve the token from localStorage
        if (!token) {
          setError('Unauthorized: No token provided.');
          return;
        }

        // Fetch tenant survey data with the token
        const response = await axios.get('http://localhost:8080/getdatatenantsurvey', {
          headers: { Authorization: `Bearer ${token}` },  // Attach the token to the request headers
        });

        const tenantsData = response.data?.tenantSurvey;  // Safely access tenantSurvey
        if (tenantsData && Array.isArray(tenantsData)) {
          const tenant = tenantsData.find(tenant => tenant._id === tenantId);
          if (tenant) {
            setFormData(tenant);
          } else {
            setError('Tenant not found.');
          }
        } else {
          setError('Invalid response data structure.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tenant data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTenantsData();
  }, [tenantId]);  // Re-run this effect when tenantId changes

  // If there's an error, show the error message
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  // While the data is being fetched, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render tenant feedback form data
  return formData ? (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-800">
            Our tenants are our guests. Our job is to make them feel comfortable and safe.
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Landlord, Ameera Alshaibany
          </p>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tenant Feedback</h1>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Submitted Feedback</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Was the work completed as requested? {formData.completedAsRequested ? 'Yes' : 'No'}</li>
            <li>Was the work completed on time? {formData.completedOnTime ? 'Yes' : 'No'}</li>
            <li>Was the technician knowledgeable? {formData.knowledgeableTechnician ? 'Yes' : 'No'}</li>
            <li>Was the technician polite? {formData.politeTechnician ? 'Yes' : 'No'}</li>
            <li>Was there any work left unfinished? {formData.unfinishedWork ? 'Yes' : 'No'}</li>
            <li>Was the work area cleaned? {formData.cleanedUp ? 'Yes' : 'No'}</li>
          </ol>

          <div className="mb-4">
            <h2 className="text-lg font-medium">Service Rating: {formData.rating}</h2>
          </div>

          {/* Conditionally render issue description if any question is answered "No" */}
          {[
            !formData.completedAsRequested,
            !formData.completedOnTime,
            !formData.knowledgeableTechnician,
            !formData.politeTechnician,
            !formData.unfinishedWork,
            !formData.cleanedUp,
          ].some(answer => answer) && (
            <div className="mb-4">
              <h2 className="text-lg font-medium">Issue Description: {formData.issueDescription}</h2>
            </div>
          )}

          <div className="mb-4">
            <h2 className="text-lg font-medium">Issues Reported: {formData.improvementSuggestions}</h2>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Contact Name: {formData.name}</h2>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-medium">Contact Email: {formData.email}</h2>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>No tenant data found.</div>
  );
};

export default TenantsFormPage;
