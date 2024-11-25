import express from 'express';
import Idea from '../models/Idea.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;

    try {
        const newIdea = new Idea({ title, content, userId });
        await newIdea.save();

        res.status(201).json({ message: 'Idea created successfully', idea: newIdea });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create idea', error: error.message });
    }
});

router.get('/', authenticate, async (req, res) => {
    const userId = req.user.id;

    try {
        const ideas = await Idea.find({ userId });
        res.status(200).json({ ideas });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch ideas', error: error.message });
    }
});

router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const idea = await Idea.findOne({ _id: id, userId });

        if (!idea) {
            return res.status(404).json({ message: 'Idea not found or access denied' });
        }

        res.status(200).json({ idea });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch idea', error: error.message });
    }
});

router.patch('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content } = req.body;

    try {
        const updatedIdea = await Idea.findOneAndUpdate(
            { _id: id, userId },
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedIdea) {
            return res.status(404).json({ message: 'Idea not found or access denied' });
        }

        res.status(200).json({ message: 'Idea updated successfully', idea: updatedIdea });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update idea', error: error.message });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const deletedIdea = await Idea.findOneAndDelete({ _id: id, userId });

        if (!deletedIdea) {
            return res.status(404).json({ message: 'Idea not found or access denied' });
        }

        res.status(200).json({ message: 'Idea deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete idea', error: error.message });
    }
});

export default router;
