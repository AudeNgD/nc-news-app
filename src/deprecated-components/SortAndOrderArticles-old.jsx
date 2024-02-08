export function SortAndOrderArticles(props) {
  const { sortAndOrder, setSortAndOrder } = props;

  function handleSortByChange(event) {
    event.preventDefault();
    setSortAndOrder((currentSortAndOrder) => {
      return { ...currentSortAndOrder, sort_by: event.target.value };
    });
  }

  function handleOrderByClick(event) {
    event.preventDefault();
    setSortAndOrder((currentSortAndOrder) => {
      return { ...currentSortAndOrder, order: event.target.value };
    });
  }

  return (
    <>
      <div id="format--articles-list">
        <label htmlFor="sort-by" hidden></label>
        <select id="sort-by" onChange={handleSortByChange}>
          <option value="created_at">Date created</option>
          <option value="votes">Likes</option>
          <option value="comment_count">Comments</option>
        </select>
        <div id="button--sort-section">
          <button
            className="button--vote"
            value="asc"
            onClick={handleOrderByClick}
          >
            ASC
          </button>
          <button
            className="button--vote"
            value="desc"
            onClick={handleOrderByClick}
          >
            DESC
          </button>
        </div>
      </div>
    </>
  );
}
