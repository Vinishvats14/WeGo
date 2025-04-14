import mongoose, { Schema } from "mongoose";

const tripPostSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: String, // Store as a string instead of ObjectId
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    companionsNeeded: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "completed"],
      required: true,
      default: "upcoming",
    },
    interestedUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: { type: String },
      },
    ],
    postedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const TripPost = mongoose.model("TripPost", tripPostSchema);
export default TripPost;
