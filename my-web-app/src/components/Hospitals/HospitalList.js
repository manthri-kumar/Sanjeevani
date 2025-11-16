import React from "react";
import HospitalCard from "./HospitalCard";
import "./HospitalList.css";

export default function HospitalList({
  sortBy = "relevance",
  setSortBy = () => {},
  total = 0,
  results = [],
  page = 1,
  pages = 1,
  setPage = () => {},
}) {
  return (
    <div className="hospital-list-wrap">
      <div className="list-top-row">
        <div className="search-inline-placeholder" />
        <div className="list-controls">
          <span className="results-count">Showing {total} results</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="relevance">Sort: Relevance</option>
            <option value="distance">Sort: Distance</option>
            <option value="rating">Sort: Rating</option>
          </select>
        </div>
      </div>

      <div className="cards">
        {results.length === 0 && (
          <div className="no-results">No hospitals match your filters.</div>
        )}

        {results.map((h) => (
          <HospitalCard key={h.id} hospital={h} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}>
          Prev
        </button>
        <span>Page {page} of {pages}</span>
        <button onClick={() => setPage(Math.min(pages, page + 1))} disabled={page >= pages}>
          Next
        </button>
      </div>
    </div>
  );
}
