import mongoose, {Schema} from "mongoose";

const tripPlanSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
  dateRange: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  numberOfTravelers: {
    type: Number,
    required: true,
  },
  itinerary: [{
    day: Number,
    activities: [String],
  }],
}, 
{
  timestamps: true});

const TripPlan = mongoose.model('TripPlan', tripPlanSchema);

export default TripPlan;
