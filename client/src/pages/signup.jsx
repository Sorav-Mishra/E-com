// import { useState } from "react";

// const UserAuthPage = () => {
//   const [isRegister, setIsRegister] = useState(true);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     number: "",
//     password: "",
//   });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     const url = isRegister ? "/api/v1/users/register" : "/api/v1/users/login";

//     // Registration payload: sending both email and number
//     const payload = isRegister
//       ? {
//           fullName: formData.fullName,
//           email: formData.email,
//           number: formData.number,
//           password: formData.password,
//         }
//       : {
//           // Login: send either email or number, depending on what the user entered
//           email: formData.email || undefined,
//           number: formData.number || undefined,
//           password: formData.password,
//         };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong");
//       }

//       alert(data.message);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black p-4">
//       <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-3xl font-semibold mb-6 text-center">
//           {isRegister ? "Register" : "Login"}
//         </h2>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           {isRegister && (
//             <div className="mb-4">
//               <label className="block text-sm mb-2">Full Name</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
//                 placeholder="Enter your full name"
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 required={isRegister}
//               />
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-sm mb-2">Email</label>
//             <input
//               type="text"
//               name="email"
//               className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required={isRegister || formData.email === ""}
//             />
//           </div>

//           {isRegister && (
//             <div className="mb-4">
//               <label className="block text-sm mb-2">Phone Number</label>
//               <input
//                 type="text"
//                 name="number"
//                 className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
//                 placeholder="Enter your phone number"
//                 value={formData.number}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           )}

//           <div className="mb-4 relative">
//             <label className="block text-sm mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-md transition duration-300"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Submit"}
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <button
//             type="button"
//             className="text-sm text-black hover:underline"
//             onClick={() => setIsRegister(!isRegister)}
//           >
//             {isRegister
//               ? "Already have an account? Log in"
//               : "Don't have an account? Register"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserAuthPage;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UserAuthPage = () => {
//   const [isRegister, setIsRegister] = useState(true);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     number: "",
//     password: "",
//   });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     const url = isRegister ? "/api/v1/users/register" : "/api/v1/users/login";

//     // Updated payload logic for login to exclude undefined fields
//     const payload = isRegister
//       ? {
//           fullName: formData.fullName,
//           email: formData.email,
//           number: formData.number,
//           password: formData.password,
//         }
//       : {
//           password: formData.password,
//           ...(formData.email ? { email: formData.email } : {}),
//           ...(formData.number ? { number: formData.number } : {}),
//         };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong");
//       }

//       alert(data.message);
//       navigate("/Profile");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black p-4">
//       <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-3xl font-semibold mb-6 text-center">
//           {isRegister ? "Register" : "Login"}
//         </h2>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           {isRegister && (
//             <div className="mb-4">
//               <label className="block text-sm mb-2">Full Name</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
//                 placeholder="Enter your full name"
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-sm mb-2">Email</label>
//             <input
//               type="text"
//               name="email"
//               className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {isRegister && (
//             <div className="mb-4">
//               <label className="block text-sm mb-2">Phone Number</label>
//               <input
//                 type="text"
//                 name="number"
//                 className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
//                 placeholder="Enter your phone number"
//                 value={formData.number}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           )}

//           <div className="mb-4 relative">
//             <label className="block text-sm mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-md transition duration-300"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Submit"}
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <button
//             type="button"
//             className="text-sm text-black hover:underline"
//             onClick={() => setIsRegister(!isRegister)}
//           >
//             {isRegister
//               ? "Already have an account? Log in"
//               : "Don't have an account? Register"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserAuthPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const url = isRegister ? "/api/v1/users/register" : "/api/v1/users/login";

    const payload = isRegister
      ? {
          fullName: formData.fullName,
          email: formData.email,
          number: formData.number,
          password: formData.password,
        }
      : {
          password: formData.password,
          ...(formData.email ? { email: formData.email } : {}),
          ...(formData.number ? { number: formData.number } : {}),
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (data.accessToken && data.refreshToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      alert(data.message);
      navigate("/Profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black p-4">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm mb-2">Email</label>
            <input
              type="text"
              name="email"
              className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {isRegister && (
            <div className="mb-4">
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="text"
                name="number"
                className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your phone number"
                value={formData.number}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          <div className="mb-4 relative">
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-sm text-black hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Log in"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;
