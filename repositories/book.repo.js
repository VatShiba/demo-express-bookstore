const Book = require("../models/Book");

exports.getAll = async () => Book.find({});

exports.getById = async (id) => Book.findById(id);

exports.create = async (payload) => Book.create(payload);

exports.edit = async (id, payload) =>
    Book.findByIdAndUpdate(id, payload, { new: true });
