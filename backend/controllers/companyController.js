import Company from '../models/Company.js';
import User from '../models/User.js';

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate('registeredBy', 'name email')
      .sort({ createdAt: -1 });

    // Get employee count for each company
    const companiesWithCount = await Promise.all(
      companies.map(async (company) => {
        const employeeCount = await User.countDocuments({
          companyDomain: company.domain,
        });
        return {
          ...company.toObject(),
          employeeCount,
        };
      })
    );

    res.json(companiesWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCompany = async (req, res) => {
  try {
    const { name, domain } = req.body;

    // Check if company already exists
    const existingCompany = await Company.findOne({ domain });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company with this domain already exists' });
    }

    const company = await Company.create({
      name,
      domain: domain.toLowerCase(),
      isActive: true,
      registeredBy: req.user._id,
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { name, isActive },
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Check if there are users from this company
    const userCount = await User.countDocuments({ companyDomain: company.domain });
    if (userCount > 0) {
      return res.status(400).json({ 
        message: `Cannot delete company. ${userCount} users are associated with this company.` 
      });
    }

    await company.deleteOne();
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
