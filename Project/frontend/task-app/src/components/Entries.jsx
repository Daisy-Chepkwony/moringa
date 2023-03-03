import React, { useState,useEffect } from 'react';
import axios from 'axios';

function Entries({ entry }) {
  const [entriesList, setEntryList] = useState([]);
  const [editId, setEditId] = useState(0);
  const [entries, setEntry] = useState({
         title:'',
        location:'',
        description:'',
        created_at:''
  })
  //ff
  // useEffect(() => {
  //   async function fetchEntries() {
  //     const response = await axios.get('/api/entries');
  //     setEntryList(response.data);
  //   }
  //   fetchEntries();
  // }, []);
  // function handleAdd() {
  //   if (entry.entries && entry.entries.length > 0) {
  //     setEntryList(entry.entries);
  //   }
  // }
  function handleAdd() {
    if (entriesList.length > 0) {
      setEntryList(entriesList);
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
      setEntry({
        title:'',
        location:'',
        description:'',
        created_at:''

      }); //fff
    }
  }

  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="fw-bold">{entry.title}</h5>
          <p className="card-text">{entry.description}</p>
          <p className="card-text">{entry.location}</p>
          <div className="d-flex flex-row">
            <p>By {entry.username}</p>
            <p className="px-3"> {entry.created_at}</p>
          </div>
          {/* <button className="btn btn-primary" onClick={handleSave}>
            {editId ? "Save" : "Add"}
          </button> */}
        </div>
        <hr />
        <div className="p-4">
          <h6>Entries</h6>
          {entriesList.length > 0 ? (
            entriesList.map((entry) => (
              <div key={entry.entry_id} className="bg-light bordered mb-2">
                {entry.entry}
                <button
                  className="btn btn-link"
                  onClick={() => handleEdit(entry.entry_id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-link"
                  onClick={() => handleDelete(entry.entry_id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No entries found.</p>
          )}
        </div>
        <div className="card-footer">
          <form>
          <div className="form-group">
            <label htmlFor="entry-input">Title:</label>
            <input type="text" className="form-control" id="entry-input"  values={entries} onChange={(e) => setEntry(e.target.value)} />   
          </div>
          <div className="form-group">
            <label htmlFor="entry-input">Location:</label>
            <input type="text" className="form-control" id="entry-input"  value={entries} onChange={(e) => setEntry(e.target.value)} />   
          </div>
          </form>
          <button className="btn btn-primary" onClick={handleSave}>
            {editId ? "Save" : "Add"}
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default Entries;






