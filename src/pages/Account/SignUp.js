import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignUp = () => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Validation des champs
    if (!clientName || !email || !phone || !password || !address || !city || !country || !zip) {
      setErrMsg("Veuillez remplir tous les champs.");
      return;
    }

    if (password.length < 6) {
      setErrMsg("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    // Récupération des utilisateurs existants
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      setErrMsg("Cet email est déjà utilisé. Veuillez en essayer un autre.");
      return;
    }

    // Enregistrement des données utilisateur
    users.push({ clientName, email, phone, password, address, city, country, zip });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccessMsg("Inscription réussie ! Redirection vers la page de connexion...");
    setTimeout(() => navigate("/signin"), 2000);

    // Réinitialisation des champs
    setClientName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setAddress("");
    setCity("");
    setCountry("");
    setZip("");
    setErrMsg("");
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <h1 className="font-titleFont text-xl font-medium">
            Créez votre compte gratuitement
          </h1>
          <p className="text-base">
            Accédez à nos services en quelques clics.
          </p>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
              tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Se connecter
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center" onSubmit={handleSignUp}>
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Créez votre compte
              </h1>
              {errMsg && <p className="text-sm text-red-500 font-titleFont font-semibold mb-2">{errMsg}</p>}
              <div className="flex flex-col gap-3">
                {/* Full Name */}
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="input-field"
                />
                {/* Email */}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
                {/* Phone */}
                <input
                  type="text"
                  placeholder="Téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                />
                {/* Password */}
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
                {/* Address */}
                <input
                  type="text"
                  placeholder="Adresse"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field"
                />
                {/* City */}
                <input
                  type="text"
                  placeholder="Ville"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input-field"
                />
                {/* Country */}
                <input
                  type="text"
                  placeholder="Pays"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="input-field"
                />
                {/* Zip Code */}
                <input
                  type="text"
                  placeholder="Code postal"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="input-field"
                />
                {/* Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <span>J'accepte les termes et conditions.</span>
                </div>
                <button
                  type="submit"
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black text-white"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  } w-full h-10 rounded-md mt-4`}
                >
                  Créer un compte
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
