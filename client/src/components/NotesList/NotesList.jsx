import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { fetchNotes } from "../../store/notesSlice";

const NotesList = ({ onClickEdit, onClickDelete }) => {
  const { notesData } = useSelector((state) => state.notes);
  const [searchType, setSearchType] = useState({});
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const onChangeSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (value.trim() === "") {
      setSearchType({});
      dispatch(fetchNotes());
      return;
    }

    let isCategory = false;
    let isTitle = false;

    notesData?.notes?.forEach((note) => {
      if (note.category.toLowerCase().includes(value.toLowerCase())) {
        isCategory = true;
      }
      if (note.title.toLowerCase().includes(value.toLowerCase())) {
        isTitle = true;
      }
    });

    if (isCategory) {
      setSearchType({ category: value });
    } else if (isTitle) {
      setSearchType({ search: value });
    } else {
      setSearchType({});
    }
  };

  const onClickSearch = () => {
    dispatch(fetchNotes(searchType));
  };


  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <div>
      <div className="md:w-[60%] border-2 border-black bg-white rounded-full flex h-8 items-center gap-2 my-4">
        <IoSearch className="text-2xl ml-2" onClick={onClickSearch} />
        <input
          type="text"
          placeholder="Search notes.."
          className="outline-none px-3 text-sm bg-white w-full h-6 rounded-3xl"
          onChange={onChangeSearch}
          value={searchText}
        />
      </div>
      <ul className="list-none">
        {notesData?.notes?.map((eachNotes) => (
          <li
            className="bg-white px-3 py-3 mb-5 rounded-xl"
            key={eachNotes?._id}
          >
            <div className="flex justify-between">
              <h2 className="font-bold text-lg">{eachNotes.title}</h2>
              <div className="flex gap-3">
                <CiEdit
                  className="text-2xl font-extrabold cursor-pointer"
                  onClick={() => onClickEdit(eachNotes)}
                />
                <MdDeleteOutline
                  className="text-2xl font-extrabold cursor-pointer"
                  onClick={() => onClickDelete(eachNotes._id)}
                />
              </div>
            </div>
            <p className="text-sm tracking-wide">{eachNotes.description}</p>
            <div className="mt-3 flex justify-between">
              <p className="text-sm">{eachNotes.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
