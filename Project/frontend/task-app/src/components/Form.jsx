import React, {useState} from "react";

function Form({entry}) {
  const [entriesList, setEntryList] = useState([]);
  const [entries, setEntry] = useState()
  const [editId, setEditId] = useState(0);
const [formInput, setFormInput] = useState({
  title:"",
  location:"",
  created_at:"",
  description:""
});

function handleSubmit(e) {
  e.preventDefault();

  fetch("http://127.0.0.1:9292/entries",{

  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formInput),
})
  .then(response => response.json())
  .then(data => entry(data))
  }

  function handleChange(e){
    const key = e.target.name
    const value = e.target.value;
    setFormInput({...formInput,[key]: value})
    console.log(formInput)
  }

  //ff
  function handleSave(e) {
    e.preventDefault();
    if (editId) {
      const updatedList = entriesList.map((e) => {
        if (e.entry_id === editId) {
          return {
            entry_id: e.entry_id,
            entry: entries,//ff
          };
        }
        return e;
      });
      setEntryList(updatedList);
      setEditId(0);
      setEntry(''); //ffrr
    } else {
      const newEntry = {
        entry_id: `${entries}-${Date.now()}`,
        entry: entries,//ff
      };
      setEntryList([...entriesList, newEntry]);
      setEntry(''); //fff
    }
  }
  function handleEdit(index) {
    const entryToUpdate = entriesList.find((e) => e.entry_id === index);
    if (entryToUpdate) {
      setEditId(index);
      setEntry(entryToUpdate.entry); //ff
    }
  }

  function handleDelete(index) {
    const newList = entriesList.filter((e) => e.entry_id !== index);
    setEntryList(newList);
  }
  return (
    
    <div className="ui segment">
      <form onSubmit = {handleSubmit}className="ui form">
        <div className="inline fields">
          < div className="form-group">
          <label htmlFor="entry-input">Date:</label>
          <input onChange={handleChange} value={formInput.created_at} type="date"  className="form-control" name="created_at" />
          <label htmlFor="entry-input">Title:</label>
          <input onChange={handleChange} value={formInput.description} type="text" className="form-control" name="description" placeholder="Description" />
          <label htmlFor="entry-input">Description:</label>
          <input onChange={handleChange} value={formInput.location} type="text" className="form-control" name="location" placeholder="location" />
          <label htmlFor="entry-input">Location:</label>
          <input onChange={handleChange} value={formInput.title} type="text"  className="form-control" name="title" placeholder="title" step="0.01" />
        </div>
        </div>
        




        
        <button className="btn btn-primary" onClick={handleSave}>
            {editId ? "Save" : "Add"}
          </button>
        {/* <button className="ui button" type="submit">
          Add Entry
        </button> */}
        
      </form>
    </div>
  );
}

export default Form;