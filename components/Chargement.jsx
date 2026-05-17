// components/Loader.jsx
function Chargement() {
  return (
    <div className="loader-container">
      <div className="loader1">
        <img src="../src/assets/logo toky adriano.png" alt="" />
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
