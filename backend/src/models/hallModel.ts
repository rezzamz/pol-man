import mongoose, { Document, Schema } from 'mongoose';

export type BudgetType = 'Standard' | 'Premium' | 'Economy';

export interface IHall extends Document {
  hallName: string;
  importerName: string;
  numberOfChickens: number;
  initialWeight: number;
  budgetType: BudgetType;
  createdAt: Date;
}

const HallSchema: Schema = new Schema({
  hallName: { type: String, required: true },
  importerName: { type: String, required: true },
  numberOfChickens: { type: Number, required: true },
  initialWeight: { type: Number, required: true },
  budgetType: { 
    type: String, 
    required: true,
    enum: ['Standard', 'Premium', 'Economy'],
    default: 'Standard'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IHall>('Hall', HallSchema);