import "./LoginPage.css";
import { useForm } from "react-hook-form";
// import { useLogin } from "../../hooks/useLogin";
import { useState } from "react";

const LoginPage = () => {
  const { login } = useLogin();
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }, // 유효성 검증
  } = useForm();

  // react-hook-form 사용
  const submitData = async (formData) => {
    const { email, password } = formData;

    try {
      await login(email, password);
      window.location = "/"; //가입되어 홈페이지로 이동
    } catch (err) {
      setFormError(err.response.data.message);
    }
  };

  return (
    <section className="align_center form_page">
      <form onSubmit={handleSubmit(submitData)} className="authentication_form">
        <h2>로그인</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">이메일</label>
            <input
              {...register("email", { required: "이메일을 입력해주세요" })}
              className="form_text_input"
              placeholder="이메일 입력"
            />
            {/* 이메일 유효성 검증 */}
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">패스워드</label>
            <input
              {...register("password", {
                required: "패스워드를 입력해주세요",
                minLength: { value: 4, message: "패스워드는 최소 4자 이상" },
              })}
              className="form_text_input"
              placeholder="패스워드 입력"
            />
            {/* 패스워드 유효성 검증 */}
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            로그인
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
