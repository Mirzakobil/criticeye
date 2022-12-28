import logo from './logo.svg';
import './App.css';

function App() {
  const google = () => {
    window.open('http://localhost:4000/google', '_self');
  };
  const github = () => {
    window.open('http://localhost:4000/github', '_self');
  };
  return (
    <div className="App">
      <div className="loginButton google" onClick={google}>
        <img src="" alt="icon" className="icon" />
        Google
      </div>
      <div className="loginButton google" onClick={github}>
        <img src="" alt="icon" className="icon" />
        Github
      </div>
    </div>
  );
}

export default App;
