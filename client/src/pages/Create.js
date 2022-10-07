import React from 'react'

const Create = () => {
  return (
    <section className='form-container'>
    <form>
        <div className="form-data-container">
            <h1>Create Book</h1>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Harry Potter"
            />
            <label htmlFor="author">Author:</label>
            <input
                type="text"
                id="author"
                name="author"
                placeholder="J.K. Rowling"
            />
            <label htmlFor="genre">Genre:</label>
            <input 
            type="text" 
            id="genre" 
            name="genre" 
            placeholder='Fantasy'
            />
            <label htmlFor="description">Brief Description:</label>
            <textarea id="description" name="description" />
            <label htmlFor="cover">Book Cover:</label>
            <input 
            type="text" 
            id="cover" 
            name="cover" 
            placeholder='https://'
            />
            <input type="submit" className="btn register" value="Create Book" />
        </div>
    </form>
   </section>
  )
}

export default Create