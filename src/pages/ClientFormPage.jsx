import React from 'react';
import { useParams } from 'react-router-dom';

const ClientFormPage = () => {
  const { clientId } = useParams();  // Get clientId from route params

  // Simulated client data
  const clients = {
    1: {
      companyName: 'Client A Company',
      servicesGiven: 'Web Development',
      date: '2024-01-15',
      wasWorkCompletedAsRequested: 'Yes',
      wasWorkCompletedOnTime: 'Yes',
      wasTechnicianKnowledgeable: 'Yes',
      wasTechnicianPolite: 'Yes',
      wasWorkLeftUnfinished: 'No',
      wasWorkAreaCleaned: 'Yes',
      serviceRating: '5',
      additionalComments: 'Great job!',
      improvementSuggestions: 'More communication on progress.',
      contactName: 'Alice',
      contactEmail: 'alice@example.com',
    },
    2: {
      companyName: 'Client B Company',
      servicesGiven: 'Mobile App Development',
      date: '2024-02-20',
      wasWorkCompletedAsRequested: 'No',
      wasWorkCompletedOnTime: 'No',
      wasTechnicianKnowledgeable: 'Yes',
      wasTechnicianPolite: 'No',
      wasWorkLeftUnfinished: 'Yes',
      wasWorkAreaCleaned: 'No',
      serviceRating: '3',
      additionalComments: 'Could be better.',
      improvementSuggestions: 'Improve punctuality.',
      contactName: 'Bob',
      contactEmail: 'bob@example.com',
    }
  };

  const formData = clients[clientId];  // Get the data based on clientId

  if (!formData) {
    return <div>Client not found.</div>;
  }

  // Check if any responses are "No"
  const hasNoResponses = [
    formData.wasWorkCompletedAsRequested,
    formData.wasWorkCompletedOnTime,
    formData.wasTechnicianKnowledgeable,
    formData.wasTechnicianPolite,
    formData.wasWorkLeftUnfinished,
    formData.wasWorkAreaCleaned,
  ].includes('No');

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
              <li>Was the work completed as requested? {formData.wasWorkCompletedAsRequested}</li>
              <li>Was the work completed on time? {formData.wasWorkCompletedOnTime}</li>
              <li>Was the technician knowledgeable? {formData.wasTechnicianKnowledgeable}</li>
              <li>Was the technician polite? {formData.wasTechnicianPolite}</li>
              <li>Was there any work left unfinished? {formData.wasWorkLeftUnfinished}</li>
              <li>Was the work area cleaned? {formData.wasWorkAreaCleaned}</li>
            </ol>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-medium">Service Rating: {formData.serviceRating}</h2>
          </div>

          {/* Conditionally render Additional Comments */}
          {hasNoResponses && (
            <div className="mb-4">
              <h2 className="text-lg font-medium">Additional Comments: {formData.additionalComments}</h2>
            </div>
          )}

          <div className="mb-4">
            <h2 className="text-lg font-medium">Improvement Suggestions: {formData.improvementSuggestions}</h2>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-medium">Contact Name: {formData.contactName}</h2>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-medium">Contact Email: {formData.contactEmail}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientFormPage;
