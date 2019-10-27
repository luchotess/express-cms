import mongoose from 'mongoose';

const PageSchema = mongoose.Schema({
    content: {
        type    : Object,
        required: true
    },
    types  : {
        type    : Object,
        required: true
    },
    domain : {
        type    : String,
        required: true
    }
});

export const Page = mongoose.model('page', PageSchema);


