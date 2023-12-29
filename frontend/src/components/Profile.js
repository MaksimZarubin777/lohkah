// checked
function Profile ({ handleLogOut, currentUser, currentUserDepartment }) {
  
  return(
    <div className="profile">
      <h2 className="profile__name">Welcome, {currentUser}!</h2>
      <p>Name: {currentUser}</p>
      <p>Department: {currentUserDepartment}</p>
      <button className="profile__logout" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Profile;