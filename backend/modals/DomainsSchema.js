import mongoose  from 'mongoose';

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      }
      
    });
export const DomainsSchema = mongoose.model('domainsSchema', Schema);

