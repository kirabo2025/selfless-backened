const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Connect to MongoDB
mongoose.connect("mongodb+srv://selflessheartsug_db_user:Javis1998@cluster0.eusttjr.mongodb.net/charityDB?retryWrites=true&w=majority")
.then(() => console.log("✅ Database connected"))
.catch(err => console.log("❌ DB error:", err));
// 🔹 Create Schema (Model)
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Form = mongoose.model("Form", formSchema);

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("🚀 API is working");
});

// 🔹 Save form (POST)
app.post("/submit", async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.send("✅ Form saved successfully");
  } catch (err) {
    res.status(500).send("❌ Error saving form");
  }
});

// 🔹 Get all forms (ADMIN)
app.get("/admin/forms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).send("❌ Error fetching data");
  }
});

// 🔹 Delete form (optional admin feature)
app.delete("/admin/forms/:id", async (req, res) => {
  try {
    await Form.findByIdAndDelete(req.params.id);
    res.send("🗑️ Form deleted");
  } catch (err) {
    res.status(500).send("❌ Error deleting form");
  }
});

// 🔹 Start server
app.listen(3000, () => {
  console.log("🔥 Server running on http://localhost:3000");
});