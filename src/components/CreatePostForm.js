import React from 'react';

const CreatePostForm = ({
  handleSubmit,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  body,
  handleBodyChange,
  category,
  handleCategoryChange
}) => (
  <div className="create-post-form-container">
    <form className="create-post" onSubmit={handleSubmit}>
      <label className="create-post-label-title">Title:</label>
      <input type="text" value={title} onChange={handleTitleChange} />
      <label>Author:</label>
      <input type="text" value={author} onChange={handleAuthorChange} />
      <label>Post Body:</label>
      <textarea rows="10" value={body} onChange={handleBodyChange} />
      <select value={category} onChange={handleCategoryChange}>
        <option disabled>Select Post Category...</option>
        <option value="react">React</option>
        <option value="redux">Redux</option>
        <option value="udacity">Udacity</option>
      </select>
      <button>Submit</button>
    </form>
  </div>
);

export default CreatePostForm;
