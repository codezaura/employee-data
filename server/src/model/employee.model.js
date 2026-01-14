import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    role: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    location: String,
    experience: String,
  },
  {
    timestamps: true,
  }
);

export const EmployeeModel = mongoose.model("employee", employeeSchema);
