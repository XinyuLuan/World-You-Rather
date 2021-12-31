import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getUsernamesAsync } from "../store/slices/usernames.slice";
import { setAuthedUser } from "../store/slices/authedUser.slice";

function Signin({ dispatch, usernames }) {
  const selection = useRef(null);

  useEffect(() => {
    dispatch(getUsernamesAsync());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const username = selection && selection.current.value;
    if (username) dispatch(setAuthedUser(username));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend className="text-center">Sign in</legend>
          <div className="mb-3">
            <label className="form-label" htmlFor="usernames"></label>
            <select id="usernames" className="form-select" ref={selection}>
              {usernames.map((username) => (
                <option key={username} value={username}>
                  {username}
                </option>
              ))}
            </select>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">
              Signin
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

const mapStateToProps = ({ usernames }) => ({
  usernames: [...usernames].sort(),
});

export default connect(mapStateToProps)(Signin);
