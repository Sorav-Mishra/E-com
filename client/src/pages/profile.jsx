import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    number: "",
    avatar: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const profileResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(profileResponse.data);

        const addressResponse = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/address/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAddresses(addressResponse.data.addresses);
      } catch (error) {
        console.error("Error fetching data", error);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access, redirecting to login...");
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarPreview(URL.createObjectURL(file));
    setUser({ ...user, avatar: file });
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("fullName", user.fullName);
    formData.append("email", user.email);
    formData.append("number", user.number);
    if (user.avatar) {
      formData.append("avatar", user.avatar);
    }

    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/Register";
  };

  const handleManageAddress = () => {
    navigate("/address");
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-50 shadow-lg rounded-xl md:p-10 lg:p-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Profile
      </h2>

      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32 mb-4">
          <img
            src={avatarPreview || user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover border-4 border-gray-300"
          />
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleAvatarChange}
            accept="image/*"
          />
        </div>
        <p className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
          Change avatar
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-gray-600 font-medium">Full Name</label>
          <input
            type="text"
            value={user.fullName}
            disabled={!isEditing}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Email</label>
          <input
            type="email"
            value={user.email}
            disabled={!isEditing}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium">
            Phone Number
          </label>
          <input
            type="text"
            value={user.number}
            disabled={!isEditing}
            onChange={(e) => setUser({ ...user, number: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Address Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Addresses</h3>
        {addresses.length === 0 ? (
          <p className="text-gray-600">No addresses available.</p>
        ) : (
          <ul className="space-y-4">
            {addresses.map((address) => (
              <li key={address._id} className="p-4 bg-white shadow rounded">
                <p className="text-gray-800 font-medium">{address.fullName}</p>
                <p className="text-gray-600">{address.addressLine1}</p>
                <p className="text-gray-600">
                  {address.city}, {address.state}, {address.postalCode}
                </p>
                <p className="text-gray-600">{address.phoneNumber}</p>
              </li>
            ))}
          </ul>
        )}
        <button
          className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          onClick={handleManageAddress}
        >
          Manage Addresses
        </button>
      </div>

      <div className="mt-8 flex justify-between items-center space-x-4">
        {!isEditing ? (
          <button
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={handleUpdateProfile}
            >
              Save Changes
            </button>
          </>
        )}
        <button
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
