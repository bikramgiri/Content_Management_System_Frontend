// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white p-4 border-t border-gray-700">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <p className="text-center md:text-left">
//             &copy; {new Date().getFullYear()} CMS. All rights reserved.
//           </p>
//           <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
//             <li>
//               <a href="#" className="text-gray-300 hover:text-white hover:underline">
//                 Privacy Policy
//               </a>
//             </li>
//             <li>
//               <a href="#" className="text-gray-300 hover:text-white hover:underline">
//                 Terms of Service
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm pl-4">&copy; {new Date().getFullYear()} CMS. All rights reserved.</p>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-sm hover:text-gray-300">About</a></li>
          <li><a href="#" className="text-sm hover:text-gray-300">Contact</a></li>
          <li><a href="#" className="text-sm hover:text-gray-300">Privacy Policy</a></li>
          <li><a href="#" className="text-sm pr-4 hover:text-gray-300">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;