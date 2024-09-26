import React, { useState } from "react";
import "../index.css";

const SubmitClientForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    servicesGiven: "",
    date: "",
    completedAsRequested: "",
    completedOnTime: "",
    knowledgeableTechnician: "",
    politeTechnician: "",
    unfinishedWork: "",
    cleanedUp: "",
    rating: 0,
    issueDescription: "",
    changesSuggested: "",
    name: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

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
        "https://survey.mangotech-api.com/ClientSurvey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Form submitted successfully:", formData);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="block text-sm font-medium text-gray-700 font-semibold">
            Thank you for completing this questionnaire. Your feedback will help
            us enhance our maintenance services, ensuring you feel comfortable
            and safe.
          </p>
        </div>
      ) : (
        <div
          style={{ fontFamily: "Aptos" }}
          className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8"
        >
          <div className="flex justify-end">
            <img
              src={require("../Images/pic.jpg")}
              alt="Login Icon"
              className="w-15 h-15 mb-8"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">
            Client Feedback Form
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Company Name */}
            <div className="mb-4">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 font-semibold"
              >
                Company Name:
              </label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* Services Given */}
            <div className="mb-4">
              <label
                htmlFor="servicesGiven"
                className="block text-sm font-medium text-gray-700 font-semibold"
              >
                Services Given:
              </label>
              <input
                type="text"
                name="servicesGiven"
                id="servicesGiven"
                value={formData.servicesGiven}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 font-semibold"
              >
                Date:
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <p className="block text-sm font-medium text-gray-700 font-semibold">Dear Clients,</p>
            <p className="block text-sm font-medium text-gray-700 font-semibold">
              We seek your feedback to improve our services. This survey will
              help us identify areas for enhancement and ensure client
              satisfaction.
            </p>
            <p className="block text-sm font-medium text-gray-700 font-semibold">
              Please take a minute to answer the following questions.
            </p>

            {/* Questions Section */}
            <ul className="list-disc ml-5">
              {[...Array(6).keys()].map((i) => (
                <li key={i} className="mb-4">
                  <p className="font-semibold">
                    {
                      [
                        "Was the work completed as requested?",
                        "Was the work completed on time?",
                        "Was the maintenance technician knowledgeable on the subject and the repairs?",
                        "Was the maintenance technician polite and respectful to you and/or your family members?",
                        "Was there any work left unfinished by the maintenance technician?",
                        "Was the work area cleaned up after completion of the job?",
                      ][i]
                    }
                  </p>
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="radio"
                      name={
                        [
                          "completedAsRequested",
                          "completedOnTime",
                          "knowledgeableTechnician",
                          "politeTechnician",
                          "unfinishedWork",
                          "cleanedUp",
                        ][i]
                      }
                      value="Yes"
                      checked={
                        formData[
                          [
                            "completedAsRequested",
                            "completedOnTime",
                            "knowledgeableTechnician",
                            "politeTechnician",
                            "unfinishedWork",
                            "cleanedUp",
                          ][i]
                        ] === true
                      }
                      onChange={() =>
                        handleChange({
                          target: {
                            name: [
                              "completedAsRequested",
                              "completedOnTime",
                              "knowledgeableTechnician",
                              "politeTechnician",
                              "unfinishedWork",
                              "cleanedUp",
                            ][i],
                            value: true,
                          },
                        })
                      }
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="inline-flex items-center mt-2 ml-4">
                    <input
                      type="radio"
                      name={
                        [
                          "completedAsRequested",
                          "completedOnTime",
                          "knowledgeableTechnician",
                          "politeTechnician",
                          "unfinishedWork",
                          "cleanedUp",
                        ][i]
                      }
                      value="No"
                      checked={
                        formData[
                          [
                            "completedAsRequested",
                            "completedOnTime",
                            "knowledgeableTechnician",
                            "politeTechnician",
                            "unfinishedWork",
                            "cleanedUp",
                          ][i]
                        ] === false
                      }
                      onChange={() =>
                        handleChange({
                          target: {
                            name: [
                              "completedAsRequested",
                              "completedOnTime",
                              "knowledgeableTechnician",
                              "politeTechnician",
                              "unfinishedWork",
                              "cleanedUp",
                            ][i],
                            value: false,
                          },
                        })
                      }
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="mb-4">
              <p className="font-semibold">
                Please rate the overall quality of the service, based on your
                responses above, using a scale of 1 to 5, with 1 being the worst
                and 5 the best, how would you rate us?
              </p>
              <p className="text-gray-600">
                {" "}
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
                  className="block text-sm font-medium text-gray-700"
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
            <p className="block text-sm font-medium text-gray-700 font-semibold">
              If you would like us to contact you on any issues stated above,
              please leave your name and email address below and we will get
              back to you as soon as possible.
            </p>

            {/* Name and Email */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <p className="block text-sm font-medium text-gray-700 font-semibold">
              Thank you for completing this questionnaire. Your feedback will
              help us enhance our maintenance services, ensuring you feel
              comfortable and safe.
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default SubmitClientForm;
