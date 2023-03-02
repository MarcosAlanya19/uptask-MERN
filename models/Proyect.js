import mongoose from "mongoose";

export const proyectsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    deliverDate: {
      type: Date,
      default: Date.now()
    },
    client:  {
      type: String,
      trim: true,
      required: true
    },
    creator:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      }
    ]
  }, {
    timestamps: true
  }
);

export const Proyect = mongoose.model('Proyect', proyectsSchema);
