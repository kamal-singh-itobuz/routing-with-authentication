import asyncHandler from 'express-async-handler'; //no need to use try catch block, it will automatically pass error to catch bloack if occur
import contactModel from '../models/contactModel.js';
//@desc Get all contacts
//@route GET /api/contacts
//@accrivate
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await contactModel.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});


//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const contact = new contactModel({ name, email, phone, user_id: req.user.id });
    await contact.save();
    res.status(201).json(contact);
});


//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
});


//@desc update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const dataToUpdate = req.body;
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You don't have permission to update this");
    }
    const updatedContact = await contactModel.findByIdAndUpdate(req.params.id, dataToUpdate, { new: true });
    res.status(200).json(updatedContact);
});


//@desc delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You don't have permission to delete this");
    }
    const contactsAfterDelete = await contactModel.deleteOne({ _id: req.params.id });
    res.status(200).json(contactsAfterDelete);
});


export { getContacts, createContact, getContact, updateContact, deleteContact };