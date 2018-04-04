const returnCommentsToRender = (nextProps, prevState) => ({
  commentsToRender: nextProps.comments.filter(
    c => c.parentId === prevState.parentId && c.deleted === false
  ),
  parentId: nextProps.parentId
});

export default returnCommentsToRender;
