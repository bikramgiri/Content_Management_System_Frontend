import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const API_URL = import.meta.env.API_URL || 'http://localhost:2000';

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { id: Date.now(), text: comment, author: 'Current User', date: new Date().toLocaleDateString() }]);
      setComment('');
    }
  };

  const fetchSingleBlog = async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs/${id}`);
      console.log(response, 'single blog data');
      if (response.status === 200) {
        setBlog(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching single blog:', error);
      setError('Failed to load blog');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setLoading(true); // Set loading state
      setError(null); // Reset error state
      try {
        const response = await axios.delete(`${API_URL}/blogs/${id}`);
        if (response.status === 200) {
          console.log('Blog deleted:', response.data);
          navigate('/'); // Redirect to home page after deletion
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        setError('Failed to delete blog');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  if (!blog) {
    return <div className="container mx-auto p-6 text-center">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 max-w-3xl bg-white shadow-md rounded-lg mt-8 mb-20 border border-blue-300 dark:border-blue-400">
        {/* Blog Header */}
        <div className="relative">
          <img
            src="/public/blog.jpeg"
            alt={blog?.title || 'Blog Feature'}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </div>

        {/* Blog Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog?.title}</h1>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <span className="flex items-center mr-4">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Bikram's Blog
            </span>
            <span className="mx-2"></span>
            <span className="flex items-center mr-4">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-4 4h6a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h6zm-6 4h6m-6 4h6m-6 4h6"
                />
              </svg>
              {blog?.createdAt?.slice(0, 10) || 'N/A'}
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7h18M3 7v10h18V7M3 7l2-2h14l2 2M3 7l2-2h14l2 2"
                />
              </svg>
              {blog?.category}
            </span>
          </div>
          <p className="text-gray-700 mb-6">{blog?.description}</p>
          <div className="flex space-x-4 mb-6">
            <Link
              to={`/editBlog/${id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit Blog
            </Link>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Deleting...' : 'Delete Blog'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </div>

        {/* Comment Section */}
        <div className="mt-8 p-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">{comment.text}</p>
                <p className="text-sm text-gray-500 mt-1">
                  - {comment.author}, {comment.date}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleBlog;