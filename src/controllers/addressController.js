import { Address } from "../models/addressModel.js";

const addAddress = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const addressData = req.body;
    console.log("Address data received:", addressData);

    // Check if required fields are provided
    const requiredFields = [
      "fullName",
      "addressLine1",
      "city",
      "state",
      "postalCode",
      "phoneNumber",
    ];
    for (const field of requiredFields) {
      if (!addressData[field]) {
        return res
          .status(400)
          .json({ message: `Missing required field: ${field}` });
      }
    }

    const newAddress = new Address({
      ...addressData,
      user: userId,
    });

    if (addressData.isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    await newAddress.save();
    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const addressData = req.body;
    const address = await Address.findByIdAndUpdate(addressId, addressData, {
      new: true,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address updated successfully", address });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    await Address.findByIdAndDelete(addressId);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const addresses = await Address.find({ user: userId });
    res
      .status(200)
      .json({ message: "Addresses fetched successfully", addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { addAddress, editAddress, deleteAddress, getUserAddresses };
