import { Request, Response } from 'express';
import Hall, { IHall, BudgetType } from '../models/hallModel';

// Get all halls
export const getHalls = async (req: Request, res: Response): Promise<void> => {
  try {
    const halls = await Hall.find().sort({ createdAt: -1 });
    res.status(200).json(halls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching halls', error });
  }
};

// Create new hall
export const createHall = async (req: Request, res: Response): Promise<void> => {
  try {
    const hallData: Omit<IHall, 'id' | 'createdAt'> = req.body;
    const newHall = new Hall(hallData);
    const savedHall = await newHall.save();
    res.status(201).json(savedHall);
  } catch (error) {
    res.status(400).json({ message: 'Error creating hall', error });
  }
};

// Update hall
export const updateHall = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const hallData: Partial<IHall> = req.body;
    
    const updatedHall = await Hall.findByIdAndUpdate(id, hallData, { new: true });
    
    if (!updatedHall) {
      res.status(404).json({ message: 'Hall not found' });
      return;
    }
    
    res.status(200).json(updatedHall);
  } catch (error) {
    res.status(400).json({ message: 'Error updating hall', error });
  }
};

// Delete hall
export const deleteHall = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedHall = await Hall.findByIdAndDelete(id);
    
    if (!deletedHall) {
      res.status(404).json({ message: 'Hall not found' });
      return;
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting hall', error });
  }
};