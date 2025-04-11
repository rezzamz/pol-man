"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHall = exports.updateHall = exports.createHall = exports.getHalls = void 0;
const hallModel_1 = __importDefault(require("../models/hallModel"));
// Get all halls
const getHalls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const halls = yield hallModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(halls);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching halls', error });
    }
});
exports.getHalls = getHalls;
// Create new hall
const createHall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hallData = req.body;
        const newHall = new hallModel_1.default(hallData);
        const savedHall = yield newHall.save();
        res.status(201).json(savedHall);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating hall', error });
    }
});
exports.createHall = createHall;
// Update hall
const updateHall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const hallData = req.body;
        const updatedHall = yield hallModel_1.default.findByIdAndUpdate(id, hallData, { new: true });
        if (!updatedHall) {
            res.status(404).json({ message: 'Hall not found' });
            return;
        }
        res.status(200).json(updatedHall);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating hall', error });
    }
});
exports.updateHall = updateHall;
// Delete hall
const deleteHall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedHall = yield hallModel_1.default.findByIdAndDelete(id);
        if (!deletedHall) {
            res.status(404).json({ message: 'Hall not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: 'Error deleting hall', error });
    }
});
exports.deleteHall = deleteHall;
