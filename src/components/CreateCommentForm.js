import React from 'react';

const CreateCommentForm = ({
  body,
  author,
  handleSubmit,
  handleBodyChange,
  handleAuthorChange
}) => (
  <div className="create-comment-form-container">
    <form className="create-comment-form">
      <label>
        <p className="create-comment-body">
          <strong>Body</strong>
        </p>
        <textarea
          value={body}
          onChange={handleBodyChange}
          columns="50"
          rows="5"
        />
      </label>
      <label>
        <p className="create-comment-author">
          <strong>Author</strong>
        </p>
        <input
          className="create-comment-author-input"
          type="text"
          value={author}
          onChange={handleAuthorChange}
        />
      </label>
      <div className="create-comment-submit-input-container">
        <input
          className="create-comment-submit-input"
          type="button"
          onClick={() => handleSubmit('submit')}
          value="Submit"
        />
        <input
          className="create-comment-submit-input"
          type="button"
          onClick={() => handleSubmit('cancel')}
          value="Cancel"
        />
      </div>
    </form>
  </div>
);

export default CreateCommentForm;
