import { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(user);
  //     setUser({ email: "", password: "" });
  //   };

  //   const passwordRef = useRef(null);

  return (
    <section className="align_center form_page">
      <form className="authentication_form">
        <h2>로그인</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={user.email}
              type="email"
              id="email"
              className="form_text_input"
              placeholder="이메일"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={user.password}
              type="password"
              id="password"
              className="form_text_input"
              placeholder="패스워드"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button type="submit" className="search_button form_submit">
            로그인
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
