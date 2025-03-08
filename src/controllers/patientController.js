import {
  getPatientById,
  searchPatientsByName,
  addPatient as addMySQLPatient,
  updatePatient as updateMySQLPatient,
  deletePatient as deleteMySQLPatient,
} from '../models/mysql.js';
import { getLabReportsByPatientId, addLabReport } from '../models/mongo.js';

// Get patient by ID
export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch from MySQL
    const patient = await getPatientById(id);

    // Fetch from MongoDB
    const labReports = await getLabReportsByPatientId(id);

    res.json({
      ...patient,
      labReports,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patient data' });
  }
};

// Search patients by name
export const searchPatients = async (req, res) => {
  try {
    const { name } = req.query;
    const patients = await searchPatientsByName(name);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search patients' });
  }
};

// Add a new patient
export const addPatient = async (req, res) => {
  try {
    const { name, age, medicalHistory } = req.body;

    // Add to MySQL
    const newPatient = await addMySQLPatient(name, age, medicalHistory);

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add patient' });
  }
};

// Update patient data
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, medicalHistory } = req.body;

    // Update in MySQL
    const updatedPatient = await updateMySQLPatient(id, name, age, medicalHistory);

    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update patient' });
  }
};

// Delete a patient
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete from MySQL
    const deletedPatient = await deleteMySQLPatient(id);

    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};