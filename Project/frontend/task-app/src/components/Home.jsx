import React, { useEffect, useState } from 'react'
import Entries from './Entries';
import Form from './Form';
// import EditEntry from './EditEntry';

function Home() {

    const [entries, setEntry] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch("http://127.0.0.1:9292/entries", {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })
        .then(r=>r.json())
        .then((response)=>{
            console.log(response)
            setEntry(response)
        })

    }, [])

  return (
    <div>
        

        <div className="container ">
            <h1 className='py-3  '>Tasks {entries && entries.length}</h1>
            <div className="row ">
                <div className="col-sm-8">
                    <div className="offcanvas-body">

                {
                    entries && entries.map((entry)=>(
                         <Entries entry={entry} key={entry.id} entries={entries.entries}  index={entries.index}   />
                         
                    ))
                    
                  }
                   <Form />                     
                </div>
                {/* <EditEntry entry={entry} key={entry.id} /> */}
                {/* <button className='edit-btn' onClick={() => handleEdit(index)}> Edit </button> */}
                {/* <button type="button"  className="btn btn-primary" data-bs-toggle="button">Add</button>
                <button type="button" onClick={() => handleEdit(entry)} className="btn btn-danger active" data-bs-toggle="button" aria-pressed="true">Edit</button> */}
                {/* <button type="button" className="btn btn-primary" disabled data-bs-toggle="button">Disabled toggle button</button> */}
                </div>

                <div className="col-sm-4">
                Tasks
                </div>
            </div>
        </div>


    </div>
  )
}

export default Home