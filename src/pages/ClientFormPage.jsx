import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClientFormPage = () => {
  const { clientId } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/getdataclientsurvey', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const clientData = response.data.clientSurvey.find(client => client._id === clientId);
        if (clientData) {
          setFormData(clientData);
        } else {
          setError('Client not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch client data');
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [clientId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Check if any question is "No"
  const hasIssues = [
    formData.completedAsRequested,
    formData.completedOnTime,
    formData.knowledgeableTechnician,
    formData.politeTechnician,
    formData.unfinishedWork,
    formData.cleanedUp,
  ].includes(false);  // Changed to check for 'false' directly

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Client Feedback</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">Company Name: {formData.companyName}</h2>
          </div>
          <div>
            <h2 className="text-lg font-medium">Services Given: {formData.servicesGiven}</h2>
          </div>
          <div>
            <h2 className="text-lg font-medium">Date: {formData.date}</h2>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-4">Survey Responses:</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Was the work completed as requested? {formData.completedAsRequested ? 'Yes' : 'No'}</li>
              <li>Was the work completed on time? {formData.completedOnTime ? 'Yes' : 'No'}</li>
              <li>Was the technician knowledgeable? {formData.knowledgeableTechnician ? 'Yes' : 'No'}</li>
              <li>Was the technician polite? {formData.politeTechnician ? 'Yes' : 'No'}</li>
              <li>Was there any work left unfinished? {formData.unfinishedWork ? 'Yes' : 'No'}</li>
              <li>Was the work area cleaned? {formData.cleanedUp ? 'Yes' : 'No'}</li>
            </ol>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Service Rating: {formData.rating}</h2>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Improvement Suggestions: {formData.changesSuggested}</h2>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Contact Name: {formData.name}</h2>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-medium">Contact Email: {formData.email}</h2>
          </div>

          {/* Display issueDescription if there are issues */}
          {hasIssues && formData.issueDescription && (
            <div className="mt-4">
              <h2 className="text-lg font-medium text-red-600">Issues Reported: {formData.improvementSuggestions}</h2>
              <p>{formData.issueDescription}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientFormPage;
