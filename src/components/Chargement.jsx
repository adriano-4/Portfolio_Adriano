// components/Loader.jsx
import logotokyadriano from "../assets/logo toky adriano.png";
function Chargement() {
  return (
    <div className="loader-container">
      <div className="loader1">
        <img src={logotokyadriano} alt="" />
        {/* <div class="loader">
        </div> */}
        <div class="newtons-cradle">
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
        </div>
      </div>
    </div>
  );
}

export default Chargement;
