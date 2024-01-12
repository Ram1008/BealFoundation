import mongoose  from 'mongoose';



const Schema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
      phoneNumber: {
        type: String,
        unique: true,
        required: true
      },
      linkedinProfile: {
        type: String
      },
      instagramId: {
        type: String
      },
      profilePhoto: {
        type: String,
        required: true
      },
      internID:{
        type: String,
        unique: true,
        required: true
      },
      jobCategory:{
        type: String,
        required: true
      },
      date:{
          type: Date,
          default: Date.now
      },
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required:"true"
      }
    });
    export const InternSchema =  mongoose.model('internSchema', Schema);

