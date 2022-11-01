import express from 'express';
import mongoose from 'mongoose';

import Foods from '../models/foodModel.js';

const router = express.Router();

const getFoods = async (req, res) => {
    try {
        const foods = await Foods.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(404).json(error);
    }
};

// const getFood = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const food = await Foods.findById(id);
//         res.status(200).json(food);
//     } catch (error) {
//         res.status(404).json(error);
//     }
// };

const createFood = async (req, res) => {
    const { title, country, description, tags, creator, selectedFile } =
        req.body;
    const newFood = new Foods({
        title,
        country,
        description,
        tags,
        creator,
        selectedFile,
    });
    try {
        await newFood.save();
        res.status(201).json(newFood);
    } catch (error) {
        res.status(409).json(error);
    }
};

const updateFood = async (req, res) => {
    const { id } = req.params;
    const { title, country, description, tags, creator, selectedFile } =
        req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No food with id: ${id}`);
    const updatedFood = {
        title,
        country,
        description,
        tags,
        creator,
        selectedFile,
        _id: id,
    };
    await Foods.findByIdAndUpdate(id, updatedFood, { new: true });
    res.json(updatedFood);
};

const deleteFood = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No food with id: ${id}`);
    await Foods.findByIdAndDelete(id);

    res.json({ message: 'Food deleted successfully :)' });
};

const loveFood = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No food with id: ${id}`);
    const love = await Foods.findById(id);
    const lovedFood = await Foods.findByIdAndUpdate(
        id,
        { loveCount: love.loveCount + 1 },
        { new: true },
    );

    res.json(lovedFood);
};

export default router;
export { getFoods, createFood, deleteFood, updateFood, loveFood };
