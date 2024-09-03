const mongoose = require('mongoose');

const arrayDataSchema = new mongoose.Schema({
    generatedArray: { type: Array, required: true },
    sortedArray: { type: Array, required: true },
    id: { type: String, unique: true, default: () => new mongoose.Types.ObjectId() }
});

module.exports = mongoose.model('ArrayData', arrayDataSchema);