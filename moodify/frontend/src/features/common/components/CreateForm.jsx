import { useRef, useState } from "react";
import "../styles/create.scss";
import useSong from "../../song/hooks/useSong";
const CreateForm = ({ handleSetForm }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const fileRef = useRef(null);
  const { handleCreateSong, loading } = useSong();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("song", file);
    formData.append("mood", text);

    try {
      await handleCreateSong(formData);
      setFile(null);
      setText("");
      fileRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-contianer">
      <div className="createform-container">
        <div onClick={() => handleSetForm(false)} className="closebtn">
          close
        </div>
        <form onSubmit={handleSubmit} className="createform">
          <div className="form-group">
            <label htmlFor="text-input">mood:</label>
            <input
              id="text-input"
              type="text"
              value={text}
              onChange={handleTextChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file-input">Upload File:</label>
            <input
              id="file-input"
              type="file"
              ref={fileRef}
              onChange={handleFileChange}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading || !file}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
