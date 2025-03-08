import express from 'express';
import {
  getPatient,
  searchPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from '../controllers/patientController.js';

const router = express.Router();

// Get patient by ID
router.get('/:id', getPatient);

// Search patients by name
router.get('/', searchPatients);

// Add a new patient
router.post('/', addPatient);

// Update patient data
router.put('/:id', updatePatient);

// Delete a patient
router.delete('/:id', deletePatient);

export default router;