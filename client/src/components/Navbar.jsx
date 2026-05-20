// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\components\Navbar.jsx

export default function Navbar() {
  return (
    <nav className="app-navbar">
      <div className="container">
        <div className="navbar-brand-wrap">
          <img
            src="/logo.png"
            alt="ElevateLabs logo"
            className="navbar-logo"
          />

          <div className="navbar-title-wrap">
            <span className="navbar-app-name">Chamado360</span>
            <small className="navbar-subtitle">
              Christian reflection about purpose
            </small>
          </div>
        </div>
      </div>
    </nav>
  );
}