import express from 'express';
const router = express.Router();
import { User } from '../models/model.js'; // Ensure this is the correct import

// Route to get user details by email
router.get('/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });  // Fetch user by email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);  // Return user data
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/user/:email', async (req, res) => {
    const { email } = req.params;
    const { name, address, contactNo } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { name, address, contactNo },
        { new: true } // Return the updated document
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


  router.delete('/user/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await User.findOneAndDelete({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

export default router;

