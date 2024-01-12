import {IdSchema} from '../modals/IdSchema.js';


export const getId = async (req, res) => {
    
    const result = await IdSchema.findOneAndUpdate({}, { $inc: { value: 1 } }, { new: true })
    .then(result =>res.json({
        success: true,
        result
    }))
    .catch(err => res.json({ err}));
    
 };