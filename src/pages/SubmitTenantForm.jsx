import React, { useState } from "react";
import "../index.css";

const SubmitTenantForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    servicesGiven: "",
    date: "",
    completedAsRequested: null,
    completedOnTime: null,
    knowledgeableTechnician: null,
    politeTechnician: null,
    unfinishedWork: null,
    cleanedUp: null,
    rating: 0,
    issueDescription: "",
    changesSuggested: "",
    name: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const your_jwt_token = "your_jwt_token_here";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://survey.mangotech-api.com/Tenantsurvey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${your_jwt_token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const shouldShowIssueDescription = () => {
    return (
      formData.completedAsRequested === false ||
      formData.completedOnTime === false ||
      formData.knowledgeableTechnician === false ||
      formData.politeTechnician === false ||
      formData.unfinishedWork === false ||
      formData.cleanedUp === false
    );
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      {submitted ? (
        <div className="text-center">
          <h1
            className="text-2xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Aptos Display" }}
          >
            Thank You!
          </h1>
          <p className="text-gray-700" >
            Thank you for completing this questionnaire. Your feedback will help
            us enhance our maintenance services, ensuring you feel comfortable
            and safe.
          </p>
        </div>
      ) : (
        <div  style={{ fontFamily: "Aptos" }} className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-end">
            <img
              src={require("../Images/pic.jpg")}
              alt="Login Icon"
              className="w-15 h-15 mb-8"
            />
          </div>

          <h1
            className="text-2xl font-bold text-gray-900 mb-1 text-center"
            
          >
            Tenant Feedback Form
          </h1>
          <div className="block text-sm font-medium text-gray-700 font-semibold ">
            <p className="text-red-500">
              “Our tenants are our guests. Our job is to make them feel
              comfortable and safe.”
            </p>
            <p className="mb-3">Landlord, Ameera Alshaibany </p>
            <p>Dear Guests,</p>
            <p>
              We are looking for ways to improve the service to our guests and
              would like your feedback on how we are doing. This survey will
              help us identify areas that need improvement and offer our guests
              an opportunity to voice concerns.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <ol className="list-none pl-0">
              {[
                {
                  question: "Was the work completed as requested?",
                  name: "completedAsRequested",
                },
                {
                  question: "Was the work completed on time?",
                  name: "completedOnTime",
                },
                {
                  question:
                    "Was the maintenance technician knowledgeable on the subject and the repairs?",
                  name: "knowledgeableTechnician",
                },
                {
                  question:
                    "Was the maintenance technician polite and respectful to you and/or your family members?",
                  name: "politeTechnician",
                },
                {
                  question:
                    "Was there any work left unfinished by the maintenance technician?",
                  name: "unfinishedWork",
                },
                {
                  question:
                    "Was the work area cleaned up after completion of the job?",
                  name: "cleanedUp",
                },
              ].map(({ question, name }, index) => (
                <li key={name} className="mb-4 flex items-start">
                  <span className="mr-2 text-gray-600">{`•`}</span>
                  <div>
                    <p className="font-semibold" >
                      {question}
                    </p>
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="radio"
                        name={name}
                        value="Yes"
                        checked={formData[name] === true}
                        onChange={() =>
                          handleChange({ target: { name, value: true } })
                        }
                        className="form-radio text-blue-600"
                      />
                      <span
                        
                        className="ml-2 text-gray-700"
                      >
                        Yes
                      </span>
                    </label>
                    <label className="inline-flex items-center mt-2 ml-4">
                      <input
                        type="radio"
                        name={name}
                        value="No"
                        checked={formData[name] === false}
                        onChange={() =>
                          handleChange({ target: { name, value: false } })
                        }
                        className="form-radio text-blue-600"
                      />
                      <span
                        
                        className="ml-2 text-gray-700"
                      >
                        No
                      </span>
                    </label>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mb-4">
              <p className="font-semibold" >
                Please rate the overall quality of the service, based on your
                responses above, using a scale of 1 to 5, with 1 being the worst
                and 5 the best, how would you rate us?
              </p>
              <p className="text-gray-600" >
                1 = Unacceptable , 2 = Needs Improvement , 3 = Average, 4 =
                Good, 5 = Excellent.
              </p>
              <input
                
                type="number"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            {shouldShowIssueDescription() && (
              <div className="mb-4">
                <label
                  htmlFor="issueDescription"
                  className="block text-sm font-medium text-gray-700 font-semibold"
                  
                >
                  If you have answered No to any of the previous questions 1
                  through 6, please give us a brief description of the problem
                  or the reason why you are not satisfied:
                </label>
                <textarea
                  
                  name="issueDescription"
                  id="issueDescription"
                  value={formData.issueDescription}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="changesSuggested"
                className="block text-sm font-medium text-gray-700 font-semibold"
                
              >
                If you could change anything about our service, what would it
                be?
              </label>
              <textarea
                
                name="changesSuggested"
                id="changesSuggested"
                value={formData.changesSuggested}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <p
              className="mb-4 text-gray-700 font-semibold"
              
            >
              If you would like us to contact you on any issues stated above,
              please leave your name and email address below and we will get
              back to you as soon as possible.
            </p>
            <div className="mb-4">
              <label
                
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label
                
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <p className="text-gray-700 font-semibold" style={{ fontFamily: 'Aptos' }}>
              Thank you for completing this questionnaire. Your feedback will
              help us enhance our maintenance services, ensuring you feel
              comfortable and safe.
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition duration-200"
              
            >
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default SubmitTenantForm;
