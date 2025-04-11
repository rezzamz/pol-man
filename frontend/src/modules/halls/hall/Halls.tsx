import React, { useState, useEffect } from 'react';
import { Hall, BudgetType } from '../HallTypes';
import HallModal from '../HallModal/HallModal';
import HallCard from '../HallCard/HallCard';
import ConfirmModal from '../HallModal/ConfirmModal';
import { getHalls, createHall, deleteHall} from '../api/halls';
import './Halls.css';


const Halls: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hallToDelete, setHallToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = async () => {
    try {
      setIsLoading(true);
      const data = await getHalls();
      setHalls(data);
    } catch (error) {
      console.error('Failed to fetch halls:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHall = async (newHall: Omit<Hall, 'id' | 'createdAt'>) => {
    try {
      const createdHall = await createHall(newHall);
      setHalls([...halls, createdHall]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create hall:', error);
    }
  };

  const handleDeleteClick = (id: string) => {
    setHallToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!hallToDelete) return;
    
    try {
      await deleteHall(hallToDelete);
      setHalls(halls.filter(hall => hall.id !== hallToDelete));
      setHallToDelete(null);
    } catch (error) {
      console.error('Failed to delete hall:', error);
    }
  };

  const handleCancelDelete = () => {
    setHallToDelete(null);
  };

  return (
    <div className="halls-container">
      <h2>Halls Management</h2>
      
      {isLoading ? (
        <div className="loading">Loading halls...</div>
      ) : (
        <div className="halls-grid">
          {/* Plus Card */}
          <div className="hall-card plus-card" onClick={() => setIsModalOpen(true)}>
            <div className="plus-icon">+</div>
            <p>Add New Hall</p>
          </div>

          {/* Existing Hall Cards */}
          {halls.map(hall => (
            <HallCard 
              key={hall.id}
              hall={hall}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Modal for adding new hall */}
      <HallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddHall}
      />

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={!!hallToDelete}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Hall"
        message="Are you sure you want to delete this hall? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Halls;