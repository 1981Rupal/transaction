const Transaction = require('../models/Transaction');

exports.getAllTransactions = async (req, res) => {
  const { startDate, endDate, category, description } = req.query;
  const query = { userId: req.user._id };
  if (startDate && endDate) query.date = { $gte: startDate, $lte: endDate };
  if (category) query.category = category;
  if (description) query.description = new RegExp(description, 'i');

  const transactions = await Transaction.find(query).sort({ date: -1 });
  res.json(transactions);
};
