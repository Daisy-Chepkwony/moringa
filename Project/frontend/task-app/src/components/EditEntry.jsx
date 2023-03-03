import React, { useState } from 'react';

const EditEntry = ({ entry }) => {
  const [title, setTitle] = useState(entry.title);
  const [location, setLocation] = useState(entry.location);
  const [date, setDate] = useState(entry.date);
  const [description, setDescription] = useState(entry.description);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`/entries/${entry.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, location, date, description }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="text-center">
      <h1>Edit your entry</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="_method" value="patch" />
        Title:<br />
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        Location:<br />
        <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} /><br />
        Date:<br />
        <input type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)} /><br />
        Description:<br />
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
        <br />
        <br />

        <input type="submit" id="submit" value="Submit Changes" />
      </form>
    </div>
  );
}

export default EditEntry;