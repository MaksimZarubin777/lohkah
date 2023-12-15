function Profile ( {handleLogOut, currentUser} ) {
  console.log(currentUser)
  return(

    <div className="profile">
      <h2 className="profile__name">Welcome, {currentUser}!</h2>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <p>Some information in future</p>
      <button className="profile__logout" onClick={handleLogOut}>Log Out</button>
    </div>

  )
}

export default Profile