import '../App.css'

const UserList = ({usersdata,userSearchData})=>{
    return(
        <div className="cardcontainer">
          <h1>List of Users</h1>
          {userSearchData ?
        <div className="card" key={userSearchData.user.id}>
          <p>Name : {userSearchData.user.name}</p>
          <p>Username : {userSearchData.user.username}</p>
          <p>Age : {userSearchData.user.age}</p>
          <p>Nationality : {userSearchData.user.nationality}</p>
        </div> : ""}
      {!userSearchData && usersdata && usersdata.users.map((user) => {
        return (
          <div className="card" key={user.id}>
            <p>Name : {user.name}</p>
            <p>Username : {user.username}</p>
            <p>Age : {user.age}</p>
            <p>Nationality : {user.nationality}</p>
          </div>
        )
      })}
      </div>
    )
}

export default UserList