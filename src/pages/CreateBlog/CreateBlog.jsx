import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const API_URL = import.meta.env.API_URL || 'http://localhost:2000';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createBlog = async (e) => {
    e.preventDefault()

    // send above data to api
    const response = await axios.post(`${API_URL}/createBlog`, data)
    if(response.status === 201){
      navigate('/'); // Redirect to home page after successful creation
    }else{
      alert("Failed to create blog")
    }
  }

  return (
    <>
      <Navbar />
      <div className="dark:bg-gray-100 container mx-auto p-6 max-w-lg bg-white shadow-md rounded-lg mt-10 mb-22 border border-blue-300 dark:border-blue-400">
        <h1 className="text-3xl font-bold text-center mb-6">Create Blog</h1>
        <form onSubmit={createBlog} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 bg-white-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">AI</option>
              <option value="Education">Personal Development</option>
            </select>
          </div>
          {/* <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-gray-700"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
            )}
          </div> */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={data.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 hover:bg-blue-600"
          >
            Create Blog
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateBlog;