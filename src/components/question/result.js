import React from "react";
import { getPercentage } from "../../utility";

export default function Result({ text, totalVotes, voted, votes }) {
  const percentage = getPercentage(votes / totalVotes);
  const votedStyle = { backgroundColor: "#f7f7f7", borderColor: "#dfdfdf" };

  return (
    <div className="card" style={voted ? votedStyle : {}}>
      {voted && (
        <div className="card-header text-center fw-bold">Your Vote</div>
      )}
      <div className="card-body">
        <p className="card-title text-center">{text}</p>
        <div className="progress" style={{ height: "20px" }}>
          <div
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percentage}%` }}
          >
            {`${percentage}%`}
          </div>
        </div>
        <div className="mt-1 small text-center">
          {votes} / {totalVotes}
        </div>
      </div>
    </div>
  );
}
