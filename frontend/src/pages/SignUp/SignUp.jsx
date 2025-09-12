import { useState } from "react"
import { eyeHide, eyeShow } from "../../constants";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../apis/auhtApi";
import './SignUp.css'

const SignUp = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({ name: "", email: "", password: "" });
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateField = (id, value) => {
        let errorMessage = "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        switch (id) {
            case 'name':
                errorMessage = !value.trim() ? "*Name is required" : "";
                break;
            case "email":
                errorMessage = !value.trim() ? "*Email is required" : !emailRegex.test(value) ? "*Invalid email format" : "";
                break;
            case "password":
                errorMessage = !value ? "*Password is required" : value.length < 8 ? "*Password must be at least 8 characters" : "";
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
        return !errorMessage;
    }

        const handleChange = (e) => {
            const { id, value } = e.target;
            setUser((prevUser) => ({ ...prevUser, [id]: value }));
            validateField(id, value);
            setFormError("");
        }

        const handleSubmit = async (e) => {
            e.preventDefault();

            const isNameValid = validateField('name', user.name);
            const isEmailValid = validateField('email', user.email);
            const isPasswordValid = validateField('password', user.password);

            if (!isNameValid || !isEmailValid || !isPasswordValid) {
                setFormError("*Please fix the errors above.");
                return;
            }

            try {
                await signUpUser(user);
                alert("Signup successful! Please sign in.");
                navigate("/signin");
            } catch (err) {
                setFormError(err.response?.data?.message || "Sign Up failed");
            }
        }

        return (
            <main className="signup">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>SignUp</h2>
                        <input id='name' type="text" placeholder="Name: Eg. John Doe" value={user.name} onChange={handleChange} />
                        {errors.name && <p className="error">{errors.name}</p>}
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
                    <button type="submit" className="auth-btn center-btn">Sign Up</button>
                    <p className="redirect_txt">Already have an account? <a href="/signin">Sign In</a></p>
                </form>
            </main>
        )
    }

    export default SignUp