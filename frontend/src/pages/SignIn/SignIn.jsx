import { useState } from "react"
import { eyeHide, eyeShow } from "../../constants";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../apis/auhtApi";
import './SignIn.css';
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const validateField = (id, value) => {
    let errorMessage = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (id) {
      case "email":
        errorMessage = !value.trim() ? "*Email is required" : !emailRegex.test(value) ? "*Invalid email format" : "";
        break;
      case "password":
        errorMessage = !value.trim() ? "*Password is required" : value.length < 6 ? "*Password must be at least 6 characters" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
    return !errorMessage;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
    validateField(id, value);
    setFormError("");

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateField('email', user.email);
    const isPasswordValid = validateField('password', user.password);

    if (!isEmailValid || !isPasswordValid) {
      setFormError("*Please fix the errors above.");
      return;
    }

    try {
      const res = await signInUser(user);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setFormError(err.response?.data?.message || "Sign In failed");
    }
  }

  return (
    <main className="signin">
      <form className="signin-form">
        <h2>Sign In</h2>
        <input id='email' type="email" placeholder="email: Eg. johndoe@example.com" value={user.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="password-container">
          <input id='password' type={showPassword ? "text" : "password"} placeholder="Create password" value={user.password} onChange={handleChange} />
          <img
            onClick={() => setShowPassword((prev) => !prev)}
            src={showPassword ? eyeHide : eyeShow}
            alt={showPassword ? 'hide-password' : 'show-password'}
            title={showPassword ? 'hide-password' : 'show-password'}
          />
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
        {formError && <p className="error">{formError}</p>}
        <button type="submit" className="auth-btn center-btn" onClick={handleSubmit}>Sign In</button>
        <p className="redirect_txt">Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </main>
  )
}

export default SignIn;