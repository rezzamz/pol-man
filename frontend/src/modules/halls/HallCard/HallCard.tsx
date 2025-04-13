import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Hall } from '../HallTypes';
import '../hall/Halls.css';

interface HallCardProps {
    hall: Hall;
    onDelete: (id: string) => void;
}

const HallCard: React.FC<HallCardProps> = ({ hall, onDelete }) => {
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleEditClick = () => {
        // Navigate to the HallDetail page with the hall name
        navigate(`/halls/${hall.hallName}`);
    };

    return (
        <div className="hall-card">
            <div className="card-header" onClick={() => setShowDetails(!showDetails)}>
                <h3><strong>Hall Name:</strong> {hall.hallName}</h3>
                <span>{showDetails ? '▲ View Less' : '▼ View More'}</span>
            </div>

            {showDetails && (
                <div className="card-details">
                    <p><strong>Importer:</strong> {hall.importerName}</p>
                    <p><strong>Chickens:</strong> {hall.numberOfChickens.toLocaleString()}</p>
                    <p><strong>Initial Weight:</strong> {hall.initialWeight} kg</p>
                    <p><strong>Budget:</strong> {hall.budgetType}</p>
                    <p><small>Created: {new Date(hall.createdAt).toLocaleDateString()}</small></p>

                    <div className="card-actions">
                        <button 
                            className="edit-button" 
                            onClick={handleEditClick} // Navigate to HallDetail
                        >
                            Edit
                        </button>
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