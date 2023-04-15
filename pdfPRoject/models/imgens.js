const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const ImageSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "nessecario o nome"],
  },
  size: {
    type: Number,
  },
  key: {
    type: String,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ImageSchema.pre("save", () => {
  if (!this.url) {
    this.url = `/files/${this.key}`;
  }
});

const Image = mongoose.model(ImageSchema);

export default Image;
