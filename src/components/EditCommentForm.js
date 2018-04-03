import React from 'react';

const EditCommentForm = ({
  body,
  handleBodyChange,
  handleSubmit,
  handleCancel
}) => (
  <form className="edit-comment-form">
    <label className="edit-comment-form-body">
      <strong>Comment Body: </strong>
      <input type="text" value={body} onChange={handleBodyChange} />
    </label>
    <br />
    <div className="post-buttons">
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  </form>
);

export default EditCommentForm;
