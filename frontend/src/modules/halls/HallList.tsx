import React, { useEffect, useState } from 'react';
import { fetchHalls } from '../../services/api';

// Define the Hall interface
interface Hall {
  _id: string;
  hallName: string;
  // Add other properties if needed
}

const HallList: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHalls = async () => {
      try {
        const data = await fetchHalls();
        setHalls(data);
      } catch (error) {
        const fetchError = error as Error;
        setError(fetchError.message);
      }
    };
    getHalls();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Halls</h1>
      <ul>
        {halls.map((hall) => (
          <li key={hall._id}>{hall.hallName}</li>
        ))}
      </ul>
    </div>
  );
};

export default HallList;