import Organization from "../model/org.model.js";
import DonatedItem from "../model/donation.model.js";
import DonationRequest from "../model/donationRequest.model.js";

export const getDonationRequests = async (req, res) => {
  try {
    const donationRequests = await DonationRequest.find();
    if (donationRequests.length === 0)
      return res.status(404).json({ message: "No donation Requests" });
    return res
      .status(200)
      .json({ length: donationRequests.length, donationRequests });
  } catch (e) {
    console.log(`error: ${e.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDonatedItems = async (req, res) => {
  try {
    const donatedItems = await DonatedItem.find()
      .populate("donationRequest")
      .populate("organization");
    if (donatedItems.length === 0)
      return res.status(404).json({ message: "No items donated" });
    return res.status(200).json({ length: donatedItems.length, donatedItems });
  } catch (e) {
    console.log(`error: ${e.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    if (organizations.length === 0)
      return res.status(404).json({ message: "No organization found" });
    return res.status(200).json({ organizations });
  } catch (e) {
    console.log(`error: ${e.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleDonationApproval = async (req, res) => {
  const { donationReqId, orgId } = req.query;

  try {
    const updatedDonationRequest = await DonationRequest.findByIdAndUpdate(
      donationReqId,
      { status: "completed" },
      { new: true }
    );
    if (!updatedDonationRequest)
      return res.status(500).json("Donation Request not approved");

    await DonatedItem.create({
      donationRequestId: donationReqId,
      organizationId: orgId,
    });
    return res
      .status(200)
      .json({ message: "Donation Request Approved", updatedDonationRequest });
  } catch (e) {
    return res.status(500).json("Internal Server Error");
  }
};

export const handleNgoRegistration = async (req, res) => {
  const {
    organization_name,
    license_number,
    registrationNumber,
    about,
    email,
    phone,
    website,
    street,
    city,
    region,
    latitude,
    longitude,
    logoUrl,
    isVerified,
    isActive,
  } = req.body;

  try {
    const newOrganization = Organization.create({
      organization_name,
      license_number,
      registrationNumber,
      about,
      contact: {
        email,
        phone,
        website,
      },
      address: {
        street,
        city,
        region,
        latitude,
        longitude,
      },
      logoUrl,
      isVerified,
      isActive,
    });

    return res.status(201).json({
      message: "Organization registered",
      organization: newOrganization,
    });
  } catch (e) {
    console.log(`error: ${e.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
