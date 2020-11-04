import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import Loader from "react-loader-spinner";

function EditProfileFrom(props) {
  const history = useHistory();
  const { userData, userDataProfile } = props;
  let username = localStorage.username;
  // const [isBusy, setBusy] = useState(true);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    // password: "",
    // company_name: "",
    // org_bio: "",
    // contact_name: "",
  });
  const [public_profile, setPublic_profile] = useState({
    company_name: "",
    org_bio: "",
    contact_name: "",
  });
  // console.log(credentials);

  useEffect(() => {
    setCredentials({
      username: userData.username,
      email: userData.email,
    });
    setPublic_profile({
      company_name:
        //undefined or null
        userDataProfile === undefined ? " " : userDataProfile.company_name,
      // userDataProfile.company_name,
      contact_name:
        userDataProfile === undefined ? " " : userDataProfile.contact_name,
      org_bio: userDataProfile === undefined ? " " : userDataProfile.org_bio,
    });
  }, [userData, userDataProfile]);
  console.log("profiel", public_profile);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPublic_profile((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };
  // const handleChange_public = (e) => {
  //   const { id, value } = e.target;
  //   setPublic_profile((prevCredentials) => ({
  //     ...prevCredentials,
  //     [id]: value,
  //   }));
  // };

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    let username = localStorage.username;

    const response1 = await fetch(
      // `${process.env.REACT_APP_API_URL}users/${userData.username}`,
      `${process.env.REACT_APP_API_URL}users/${username}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/org/${username}/profile/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");
    if (credentials.username) {
      editData().then((response) => {
        // setBusy(false);
        console.log(response);
        // window.localStorage.setItem("username", credentials.username);
        history.push(`profile/${username}`);
      });
    }
  };

  return (
    // <>
    //   {isBusy ? (
    // <Loader />
    // <p>loading</p>
    // ) : (
    <form className="form">
      <div className="form-item">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={credentials.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="company_name">Company Name:</label>
        <input
          type="text"
          id="company_name"
          value={public_profile.company_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="contact_name">Contact Name:</label>
        <input
          type="text"
          id="contact_name"
          value={public_profile.contact_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="org_bio">Bio:</label>
        <input
          type="text"
          id="org_bio"
          value={public_profile.org_bio}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div> */}
      <button className="btn" type="submit" onClick={handleSubmit}>
        Update Account
      </button>
    </form>
    // )}
    // </>
  );
}

export default EditProfileFrom;