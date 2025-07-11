import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const API_URL = import.meta.env.API_URL || 'http://localhost:2000';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get(`${API_URL}/blogs`);
    setBlogs(response.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log(blogs, 'blogs');

  return (
    <>
      <Navbar />
      <div className="container mb-13 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {blogs.map((blog) => (
            <div key={blog._id} className="max-w-sm bg-white border border-blue-200 rounded-lg shadow-sm dark:bg-gray-600 dark:border-blue-700">
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src="./public/blog.jpeg"
                  alt="feature image"
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-800 uppercase dark:text-blue-300">
                    {blog.title}
                  </h5>
                </a>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
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
                    {blog.userId?.username || 'Unknown Author'}
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
                        d="M3 7h18M3 7v10h18V7M3 7l2-2h14l2 2M3 7l2-2h14l2 2"
                      />
                    </svg>
                    {blog.category}
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
                        d="M8 7V3m8 4V3m-4 4h6a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h6zm-6 4h6m-6 4h6m-6 4h6"
                      />
                    </svg>
                    {blog.createdAt.slice(0, 10)}
                  </span>
                </div>
                <p className="mb-3 font-normal text-gray-900 dark:text-gray-300">
                  {blog.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-bold text-center text-gray-900 uppercase bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  READ MORE
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;