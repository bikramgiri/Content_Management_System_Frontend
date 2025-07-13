import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.API_URL || 'http://localhost:2000';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    category: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_URL}/blogs/${id}`);
        if (response.status === 200) {
          setData(response.data.data); // Prefill with existing data
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to load blog data');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`${API_URL}/blogs/${id}`, data);
      if (response.status === 200) {
        navigate(`/SingleBlog/${id}`); // Redirect to single blog page after update
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container mx-auto p-6 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto p-6 text-center text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="dark:bg-gray-100 container mx-auto p-6 max-w-lg bg-white shadow-md rounded-lg mt-10 mb-22 border border-blue-300 dark:border-blue-400">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Blog</h1>
        <form onSubmit={updateBlog} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
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
              <option value="AI">AI</option>
              <option value="Personal Development">Personal Development</option>
            </select>
          </div>
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
            disabled={loading}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditBlog;