const express = require('express');

const User = require('../models/User');

const router = express.Router();


router.get("/:id", async (req, res) => {
    try
    {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send({error: 'User not found'});
        }

        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({error: 'Error during fetching user'});
        console.error('Error during fetching user:', error);
    }
});

module.exports = router;