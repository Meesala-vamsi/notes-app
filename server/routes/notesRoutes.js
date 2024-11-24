const express = require("express");
const {createNotes,updateNotes,deleteNotes, fetchAllNotes} = require("../controllers/notesController");

const router = express.Router();

router.post("/create",createNotes);
router.patch("/update/:id",updateNotes);
router.delete("/delete/:id",deleteNotes);
router.get("/fetch",fetchAllNotes);

module.exports = router;