const Navbar = ({ user }) => {
  const logout = () => {
    window.open('http://localhost:5000/auth/logout', '_self');
  };
  return (
    <div className="navbar">
      <span className="logo">
        <a className="link" href="/">
          Lama App
        </a>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">{user.firstName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <a className="link" href="login">
          Login
        </a>
      )}
    </div>
  );
};

export default Navbar;
