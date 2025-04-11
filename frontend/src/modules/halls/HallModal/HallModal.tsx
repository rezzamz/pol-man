import React, { useState } from 'react';
import { Hall, BudgetType } from '../HallTypes';
import '../hall/Halls.css';
interface HallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (hall: Hall) => void;
}

const HallModal: React.FC<HallModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<Omit<Hall, 'id' | 'createdAt'>>({
    hallName: '',
    importerName: '',
    numberOfChickens: 0,
    initialWeight: 0,
    budgetType: 'Standard',
  });

  const budgetTypes: BudgetType[] = ['Standard', 'Premium', 'Economy'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'numberOfChickens' || name === 'initialWeight' 
        ? Number(value) 
        : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHall: Hall = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(), // Convert to string
    };
    onSubmit(newHall);
        // Here you would typically send data to backend
    console.log('Submitting hall data:', newHall);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Hall</h3>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Hall Name</label>
            <input
              type="text"
              name="hallName"
              value={formData.hallName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Importer Name</label>
            <input
              type="text"
              name="importerName"
              value={formData.importerName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Number of Chickens</label>
            <input
              type="number"
              name="numberOfChickens"
              value={formData.numberOfChickens}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Initial Weight (kg)</label>
            <input
              type="number"
              name="initialWeight"
              value={formData.initialWeight}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Budget Type</label>
            <select
              name="budgetType"
              value={formData.budgetType}
              onChange={handleChange}
              required
            >
              {budgetTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HallModal;