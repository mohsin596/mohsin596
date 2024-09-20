import React from 'react';
import { useParams } from 'react-router-dom';

const TenantsFormPage = () => {
  const { tenantId } = useParams();
  const tenants = {
    1: {
      wasWorkCompletedAsRequested: 'Yes',
      wasWorkCompletedOnTime: 'Yes',
      wasTechnicianKnowledgeable: 'Yes',
      wasTechnicianPolite: 'Yes',
      wasWorkLeftUnfinished: 'No',
      wasWorkAreaCleaned: 'Yes',
      serviceRating: '5',
      additionalComments: 'Great job!',
      improvementSuggestions: 'More communication on progress.',
      contactName: 'Martha',
      contactEmail: 'martha@example.com',
    },
    2: {
      wasWorkCompletedAsRequested: 'No',
      wasWorkCompletedOnTime: 'No',
      wasTechnicianKnowledgeable: 'Yes',
      wasTechnicianPolite: 'No',
      wasWorkLeftUnfinished: 'Yes',
      wasWorkAreaCleaned: 'No',
      serviceRating: '3',
      additionalComments: 'Could be better.',
      improvementSuggestions: 'Improve punctuality.',
      contactName: 'William',
      contactEmail: 'william@example.com',
    },
  };

  const formData = tenants[tenantId]; 
  if (!formData) {
    return <div>Tenant not found.</div>;
  }

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
            <li>Was the work completed as requested? {formData.wasWorkCompletedAsRequested}</li>
            <li>Was the work completed on time? {formData.wasWorkCompletedOnTime}</li>
            <li>Was the maintenance technician knowledgeable on the subject and the repairs? {formData.wasTechnicianKnowledgeable}</li>
            <li>Was the maintenance technician polite and respectful? {formData.wasTechnicianPolite}</li>
            <li>Was there any work left unfinished? {formData.wasWorkLeftUnfinished}</li>
            <li>Was the work area cleaned up after the job? {formData.wasWorkAreaCleaned}</li>
          </ol>

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

export default TenantsFormPage;
