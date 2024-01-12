import {DomainsSchema} from '../modals/DomainsSchema.js';

export const getAllDomains = async (req, res) => {
    const domains = await DomainsSchema.find()
    .then(res => res.status(201).json(
        {success: true,
        domains}))
    .catch(err => res.status(500).json(err));
};

export const addDomain = async (req, res) => {
        const { name } = req.body;
        const domain = new DomainsSchema({
            name
        });
        
        const savedDomain = await DomainsSchema.save()
        .then(res => res.status(201).json({success: true}))
        .catch(err => res.status(500).json(err));

};

export const deleteDomain = async (req, res) => {
   
        await DomainsSchema.findByIdAndDelete(req.params.id)
        .then(res => res.status(201).json({success: true}))
        .catch(err => res.status(500).json(err));
};