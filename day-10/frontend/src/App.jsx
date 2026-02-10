import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const App = () => {
  const [storeNotes, setstoreNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  const getItems = async () => {
    axios
      .get("https://backend-w52w.onrender.com/notes")
      .then((res) => setstoreNotes(res.data.notes));
  };
  useEffect(() => {
    getItems();
  }, []);
  console.log(storeNotes);
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.target.elements.title);
    const { title, description } = e.target.elements;
    // console.log(title.value, description.value);
    axios
      .post("https://backend-w52w.onrender.com/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        getItems();
      });
    e.target.reset();
  }
  function handleDelete(id) {
    // console.log(id);
    axios
      .delete("https://backend-w52w.onrender.com/notes/" + id)
      .then((res) => {
        console.log(res.data);
        getItems();
      });
  }
  function handleUpdate(id) {
    axios
      .patch("https://backend-w52w.onrender.com/notes/" + id, editData)
      .then((res) => {
        console.log(res.data);
        setEditId(null); // close edit mode
        getItems();
      });
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen w-full bg-neutral-800 p-10">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex gap-2 bg-white p-5 rounded-md"
      >
        <input
          name="title"
          type="text"
          placeholder="enter title"
          className="border rounded px-5"
        />
        <input
          name="description"
          type="text"
          placeholder="enter description"
          className="border rounded px-5"
        />
        <button className="border bg-amber-800 hover:bg-amber-700 rounded px-5">
          add notes
        </button>
      </form>
      <div className="flex gap-2 h-screen w-full">
        {storeNotes.map((elem, idx) => {
          return (
            <div
              className="bg-white rounded-md gap-2 flex flex-col items-center justify-center h-40 w-60"
              key={idx}
            >
              {editId === elem._id ? (
                <>
                  <input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="border"
                  />

                  <input
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="border"
                  />
                </>
              ) : (
                <>
                  <div className="text-black">{elem.title}</div>
                  <div className="text-black">{elem.description}</div>
                </>
              )}

              <div className="flex gap-2">
                {editId == elem._id ? (
                  <button
                    className="text-white bg-red-500 px-2 hover:bg-stone-700 active:scale-[0.95]"
                    onClick={() => {
                      setEditId(null);
                    }}
                  >
                    cancel
                  </button>
                ) : (
                  <button
                    className="text-white bg-red-500 px-2 hover:bg-stone-700 active:scale-[0.95]"
                    onClick={() => {
                      handleDelete(elem._id);
                    }}
                  >
                    delete
                  </button>
                )}

                {editId == elem._id ? (
                  <button
                    className="bg-green-500 text-white px-2"
                    onClick={() => handleUpdate(elem._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-white bg-black px-2"
                    onClick={() => {
                      setEditId(elem._id);
                      setEditData({
                        title: elem.title,
                        description: elem.description,
                      });
                    }}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
