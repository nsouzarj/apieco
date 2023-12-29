const Activity = require('../models/activity.model');

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const newActivity = {
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    price: req.body.price
  };

  try {
    const activity = await Activity.create(newActivity);
    res.status(201).send(activity);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Activity."
    });
  }
};