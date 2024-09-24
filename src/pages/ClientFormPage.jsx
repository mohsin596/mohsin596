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
        const response = await axios.get('https://survey.mongotech-api.com/GetDataClientSurvey', {
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


  return formData ? (
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
          {[
            !formData.completedAsRequested,
            !formData.completedOnTime,
            !formData.knowledgeableTechnician,
            !formData.politeTechnician,
            !formData.unfinishedWork,
            !formData.cleanedUp,
          ].some(answer => answer) && (
            <div className="mb-4">
              <h2 className="text-lg font-medium">If you have answered No to any of the previous questions 1 through 6: {formData.issueDescription}</h2>
            </div>
          )}
          <div className="mb-4">
            <h2 className="text-lg font-medium">If you could change anything about our service, what would it be: {formData.changesSuggested}</h2>
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
    <div>No Client data found.</div>
  );
};

export default ClientFormPage;
