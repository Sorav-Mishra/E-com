import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    phoneNumber: "",
    isDefault: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/Register");
    } else {
      fetchAddresses(accessToken);
    }
  }, [navigate]);

  const fetchAddresses = async (accessToken) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/address/get`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (editMode) {
        await axios.put(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/address/edit/${selectedAddressId}`,
          address,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        alert("Address updated successfully");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/address/addAddress`,
          address,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        alert("Address added successfully");
      }
      fetchAddresses(accessToken);
      resetForm();
      navigate("/Profile");
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("Failed to submit address.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setEditMode(true);
    setSelectedAddressId(address._id);
    setAddress({
      fullName: address.fullName,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      phoneNumber: address.phoneNumber,
      isDefault: address.isDefault,
    });
  };

  const handleDelete = async (addressId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/address/delete/${addressId}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        alert("Address deleted successfully");
        fetchAddresses(accessToken);
      } catch (error) {
        console.error("Error deleting address:", error);
        alert("Failed to delete address.");
      }
    }
  };

  const resetForm = () => {
    setAddress({
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      phoneNumber: "",
      isDefault: false,
    });
    setEditMode(false);
    setSelectedAddressId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          {editMode ? "Edit Address" : "Add New Address"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Address Line 1</label>
            <input
              type="text"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={address.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isDefault"
              checked={address.isDefault}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-600">Set as default address</label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            disabled={loading}
          >
            {loading
              ? editMode
                ? "Updating..."
                : "Saving..."
              : editMode
              ? "Update Address"
              : "Save Address"}
          </button>

          {editMode && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full bg-red-500 text-white py-2 mt-2 rounded-lg hover:bg-red-700"
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Your Addresses</h3>
          {addresses.map((addr) => (
            <div key={addr._id} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p>{addr.fullName}</p>
              <p>{addr.addressLine1}</p>
              <p>{`${addr.city}, ${addr.state} - ${addr.postalCode}`}</p>
              <p>{addr.phoneNumber}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(addr)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
