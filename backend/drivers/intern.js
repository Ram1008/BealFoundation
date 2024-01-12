import {InternSchema} from '../modals/InternSchema.js';
import { validationResult } from 'express-validator';
import {getId} from './id.js';
export const getAllInterns = async (_, res) =>{
    const details = await InternSchema.find()
    .then(detail => res.json(
        {success: true,
            detail}))
    .catch(err => res.status(404).json(err));
};
export const addIntern = async (req, res) => {
    const { name, email, startDate, endDate, phoneNumber, linkedinProfile, instagramId, profilePhoto, jobCategory } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors });
    }
    const details = new InternSchema({
        name,
        email,
        startDate,          
        endDate,
        phoneNumber,
        linkedinProfile,
        instagramId,
        profilePhoto,
        internID : getId(),
        jobCategory
    });
    
    await details.save()
    .then(res => res.json({success: true}))
    .catch(err => res.json(err ));
   
    
};
export const deleteIntern = async (req, res) => {
    try {
        await Detail.findByIdAndDelete(req.params.id)
        res.send("Successfully Deleted");
    } catch(error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server Error" });
    }
};
export const updateIntern = async (req, res) => {
    const { name, email, startDate, endDate, phoneNumber, linkedinProfile, instagramId, profilePhoto, jobCategory } = req.body;
    
    try {
        const newDetail = {};
        if (name) { newDetail.name = name };
        if (email) { newDetail.email = email };
        if (startDate) { newDetail.startDate = startDate };
        if (endDate) { newDetail.endDate = endDate };
        if (phoneNumber) { newDetail.phoneNumber = phoneNumber };
        if (linkedinProfile) { newDetail.linkedinProfile = linkedinProfile };
        if (instagramId) { newDetail.instagramId = instagramId };
        if (profilePhoto) { newDetail.profilePhoto = profilePhoto };
        if (jobCategory) { newDetail.jobCategory = jobCategory };

        // Find the note to be updated and update 
        let detail = await InternSchema.findById(req.params.id);
        if (!detail) { res.status(404).send("Not Found") };

        detail = await InternSchema.findByIdAndUpdate(req.params.id, { $set: newDetail }, { new: true })
        res.json(detail);
    } catch(error) {
        res.status(500).json({ error: "Internal server Error" });
    }
};
export const getIntern = async (req, res) => {
    const {id} = req.body;
    try{
        const detail = await InternSchema.findOne({internID:id});
        res.json(detail);
    }catch(err){
        res.status(500).json({ error: "Internal server Error" });
    }
};
export const getCertificate = async (req, res) => {
    const {id} = req.body;
    try{
        const detail = await InternSchema.findOne({internID:id});
        res.json(detail)
    }catch(err){
        res.status(500).json({ error: "Internal server Error" });
    }
};
