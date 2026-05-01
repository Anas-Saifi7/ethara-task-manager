import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"} // pls notice this line
});

export default mongoose.model("Project", projectSchema);