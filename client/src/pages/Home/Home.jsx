import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNotes, deleteNotes, fetchNotes, updateNotes } from "../../store/notesSlice";
import { toast } from "react-toastify";
import NotesList from "../../components/NotesList/NotesList";

const Home = () => {
  const [formData, setFormData] = useState({
    id:null,
    title: "",
    description: "",
    category: "Work",
  });
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const onChangeInput = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onSubmitData = (event) => {
    event.preventDefault();
    if(!isEditing){
      dispatch(createNotes(formData)).then((response) => {
        if (response?.payload.status === "success") {
          toast.success(response?.payload?.message);
          dispatch(fetchNotes());
          setFormData({
            title: "",
            description: "",
            category: "Work",
          });
        }
      });
    }

    dispatch(updateNotes(formData))
    .then((response)=>{
      if(response?.payload?.status==="success"){
        setFormData({
          title: "",
          description: "",
          category: "Work",
        });
        dispatch(fetchNotes());
        toast.success(response?.payload?.message);
      }
    })
  };

  const onClickEdit =(notes)=>{
    setIsEditing(true);
    setFormData({
      id:notes._id,
      title:notes.title,
      description:notes.description,
      category:notes.category
    })
  }

  const onClickDelete = (id)=>{
    dispatch(deleteNotes(id))
    .then((response)=>{
      if(response?.payload?.status==="success"){
        toast.success(response?.payload?.message);
        dispatch(fetchNotes());
      }
    })
  }

  return (
    <div className="md:h-screen flex flex-col md:flex-row px-1 py-2 md:px-4 md:py-5">
      <form
        className="bg-white px-2 py-2 md:px-4 md:py-3 mx-4 rounded-md md:w-2/3"
        onSubmit={onSubmitData}
      >
        <h2 className="tracking-wider font-bold text-3xl">
          {isEditing ? "Edit Notes" : "Create Notes"}
        </h2>
        <div className="mb-3 flex flex-col gap-2 mt-3">
          <label htmlFor="title" className="font-bold text-lg tracking-wider">
            Title:
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            onChange={onChangeInput}
            value={formData.title}
            className="outline-none px-2 bg-gray-200 h-9 rounded-lg"
            required
          />
        </div>
        <div className="mb-3 flex flex-col gap-2 mt-3">
          <label
            htmlFor="description"
            className="font-bold text-lg tracking-wider"
          >
            Description:
          </label>
          <textarea
            id="description"
            placeholder="Enter Description"
            rows={5}
            className="outline-none p-4 bg-gray-200 rounded-lg w-full resize-y"
            onChange={onChangeInput}
            value={formData.description}
            required
          />
        </div>
        <div className="mb-3 flex flex-col gap-2 mt-3">
          <label
            htmlFor="category"
            className="font-bold text-lg tracking-wider"
          >
            Category:
          </label>
          <select
            id="category"
            className="outline-none px-2 bg-gray-200 h-9 rounded-lg"
            onChange={onChangeInput}
            value={formData.category}
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Others</option>
          </select>
        </div>
        <button className="bg-violet-200 outline-none border-0" type="submit">
          {isEditing ? "Update Notes" : "Add Notes"}
        </button>
      </form>
      <div className="md:w-1/3 px-4 py-2 md:px-0 md:py-0 h-full overflow-y-scroll scrollbar-hide">
        <h2 className="font-bold tracking-widest text-3xl mx-3 my-5">
          My Notes
          <NotesList onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
        </h2>
      </div>
    </div>
  );
};

export default Home;
