const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["TODO", "DONE"],
      default: "TODO",
    },
    linkedFile: {
      type: Buffer, // Storing file as a Blob (Buffer in MongoDB)
      contentType: String,
    },

    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
