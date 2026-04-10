const PizzaOption = require('../models/PizzaOption');

exports.addOption = async (req, res) => {
  const { category, name } = req.body;
  try {
    const option = new PizzaOption({ category, name });
    await option.save();
    res.json(option);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.listOptions = async (req, res) => {
  try {
    const options = await PizzaOption.find();
    res.json(options);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
