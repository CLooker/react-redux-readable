import React from 'react';

const CreateCommentForm = ({
  body,
  author,
  handleSubmit,
  handleBodyChange,
  handleAuthorChange
}) => (
  <div className="create-comment">
    <form className="create-comment-form" onSubmit={handleSubmit}>
      <label>
        <p className="create-comment-body">
          <strong>Body</strong>
        </p>
        <textarea
          value={body}
          onChange={handleBodyChange}
          columns="50"
          rows="10"
        />
      </label>
      <label>
        <p className="create-comment-author">
          <strong>Author</strong>
        </p>
        <input type="text" value={author} onChange={handleAuthorChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default CreateCommentForm;
