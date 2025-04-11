import { useState } from 'react';
import { Hall } from '../HallTypes';
import '../hall/Halls.css';
interface HallCardProps {
    hall: Hall;
    onDelete: (id: string) => void;
  }
  
  const HallCard: React.FC<HallCardProps> = ({ hall, onDelete }) => {
    const [showDetails, setShowDetails] = useState(false);
  
    return (
      <div className="hall-card">
        <div className="card-header" onClick={() => setShowDetails(!showDetails)}>
          <h3><strong>hall name:</strong> {hall.hallName}</h3>
          <span>{showDetails ? '▲ viwe less' : '▼ view more'}</span>
        </div>
        
        {showDetails && (
          <div className="card-details">
            <p><strong>Importer:</strong> {hall.importerName}</p>
            <p><strong>Chickens:</strong> {hall.numberOfChickens.toLocaleString()}</p>
            <p><strong>Initial Weight:</strong> {hall.initialWeight} kg</p>
            <p><strong>Budget:</strong> {hall.budgetType}</p>
            <p><small>Created: {new Date(hall.createdAt).toLocaleDateString()}</small></p>
            
            <div className="card-actions">
              <button className="edit-button">Edit</button>
              <button 
                className="delete-button"
                onClick={() => onDelete(hall.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default HallCard;