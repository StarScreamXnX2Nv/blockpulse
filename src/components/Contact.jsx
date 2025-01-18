import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white dark:bg-[#121212] rounded-lg shadow-lg min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#00df9a] dark:text-[#00df9a]">
        Get in Touch
      </h1>
      <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
        Reach out for collaborations and inquiries.
      </p>

      <div className="flex justify-center">
        <form 
          onSubmit={handleSubmit} 
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-3/4 lg:w-2/3"
        >
          {/* First Name & Last Name */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full">
              <label className="block text-gray-700 dark:text-gray-300 font-bold">First Name *</label>
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                required 
                placeholder="Enter your first name"
                className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 dark:text-gray-300 font-bold">Last Name *</label>
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                required 
                placeholder="Enter your last name"
                className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-bold">Email Address *</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="Enter your email address"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-bold">What can we help with? *</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              placeholder="Enter your message"
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              rows="5"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
              type="submit"
              className="bg-[#00df9a] dark:bg-[#007a4e] text-black dark:text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#00c482] dark:hover:bg-[#005f3b] transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
