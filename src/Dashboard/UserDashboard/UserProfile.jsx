
// import React from "react";

// function UserProfile() {
//   return (
//     <div className="bg-gray-100 min-h-screen font-sans">
//       <div className="container mx-auto p-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-semibold">User Profile</h1>
//           <div className="flex items-center space-x-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 text-gray-600"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.16 6 8.388 6 11v3.158a2.032 2.032 0 01-1.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//               />
//             </svg>
//             <span className="font-semibold">John Admin</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             {/* Sarah Johnson Section */}
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold">Sarah Johnson</h2>
//               <p className="text-gray-600">sarah@example.com</p>
//               <button className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 mt-2 text-sm">
//                 Student
//               </button>
//             </div>
//             {/* Profile Completion Section */}
//             <div className="mb-6 border-b pb-4">
//               <h3 className="font-semibold">Profile Completion</h3>
//               <div className="flex items-center justify-between mt-2">
//                 <span>85%</span>
//                 <div className="w-1/2 bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-blue-500 rounded-full h-2"
//                     style={{ width: "85%" }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Quick Stats Section */}
//             <div> 
//               <div className="pt-4 bg-white rounded-lg shadow ">
//                 <h3 className="font-semibold">Quick Stats</h3>
//                 <div className="mt-4 space-y-2 ">
//                   <div className="flex items-center justify-between">
//                     <span>Total Quizzes</span>
//                     <span className="font-semibold">48</span>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-green-500"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 17v-2m3 4v-4m3 4v-2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span>Average Score</span>
//                     <span className="font-semibold">87%</span>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-blue-500"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                       />
//                     </svg>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span>Best Subject</span>
//                     <span className="font-semibold">Mathematics</span>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-yellow-500"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>
//         </div>
          
//           <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
//             {/* Performance Overview Section */}
//             <div className="mb-8 border-b pb-6">
//               <h2 className="text-xl font-semibold mb-6">
//                 Performance Overview
//               </h2>
//               <div className="relative">
//                 {/* Replace the placeholder with the image */}
//                 <img
//                   src="/performanceChart.png"
//                   alt="Performance Chart"
//                   className="w-full h-[320px] rounded-lg"
//                 />
                
//               </div>
//             </div>
//             {/* Settings Section */}
//             <div>
//               <div className="pt-6">
//                 <h2 className="text-xl font-semibold mb-6">Settings</h2>
//                 <div className="mb-4">
//                   <h3 className="font-semibold">Personal Information</h3>
//                   <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         value="Sarah Johnson"
//                         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         value="sarah@example.com"
//                         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <h3 className="font-semibold">Notifications</h3>
//                   <div className="mt-2 space-y-2">
//                     <div className="flex items-center justify-between">
//                       <span>Email Notifications</span>
//                       <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
//                         <input
//                           type="checkbox"
//                           name="toggle"
//                           id="toggle"
//                           className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
//                         />
//                         <label
//                           htmlFor="toggle"
//                           className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
//                         ></label>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span>Quiz Reminders</span>
//                       <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
//                         <input
//                           type="checkbox"
//                           name="toggle2"
//                           id="toggle2"
//                           className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
//                         />
//                         <label
//                           htmlFor="toggle2"
//                           className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
//                         ></label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
//                   Deactivate Account
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;








import React from "react";

function UserProfile() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">User Profile</h1>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.16 6 8.388 6 11v3.158a2.032 2.032 0 01-1.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="font-semibold">John Admin</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Sarah Johnson Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Sarah Johnson</h2>
              <p className="text-gray-600">sarah@example.com</p>
              <button className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 mt-2 text-sm">
                Student
              </button>
            </div>
            {/* Profile Completion Section */}
            <div className="mb-6 border-b pb-4">
              <h3 className="font-semibold">Profile Completion</h3>
              <div className="flex items-center justify-between mt-2">
                <span>85%</span>
                <div className="w-1/2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Stats Section */}
            <div>
              <div className="pt-4 bg-white rounded-lg shadow ">
                <h3 className="font-semibold">Quick Stats</h3>
                <div className="mt-4 space-y-2 ">
                  <div className="flex items-center justify-between">
                    <span>Total Quizzes</span>
                    <span className="font-semibold">48</span>
                    <img src="/oky.png" alt="Total Quizzes Icon" className="h-6 w-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Score</span>
                    <span className="font-semibold">87%</span>
                    <img src="/group.png" alt="Average Score Icon" className="h-6 w-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Best Subject</span>
                    <span className="font-semibold">Mathematics</span>
                    <img src="/trophy.png" alt="Best Subject Icon" className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            {/* Performance Overview Section */}
            <div className="mb-8 border-b pb-6">
              <h2 className="text-xl font-semibold mb-6">
                Performance Overview
              </h2>
              <div className="relative">
                {/* Replace the placeholder with the image */}
                <img
                  src="/performanceChart.png"
                  alt="Performance Chart"
                  className="w-full h-[320px] rounded-lg"
                />
              </div>
            </div>
            {/* Settings Section */}
            <div>
              <div className="pt-6">
                <h2 className="text-xl font-semibold mb-6">Settings</h2>
                <div className="mb-4">
                  <h3 className="font-semibold">Personal Information</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value="Sarah Johnson"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value="sarah@example.com"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold">Notifications</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input
                          type="checkbox"
                          name="toggle"
                          id="toggle"
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        />
                        <label
                          htmlFor="toggle"
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Quiz Reminders</span>
                      <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input
                          type="checkbox"
                          name="toggle2"
                          id="toggle2"
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        />
                        <label
                          htmlFor="toggle2"
                          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>
                <h1>Pasword</h1>
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;