import mongoose  from 'mongoose';

const Schema = new mongoose.Schema({
    
       internId:{
        type: String,
        required: true,
        default: 1000,
      }
    });
export const IdSchema = mongoose.model('ID', Schema);

