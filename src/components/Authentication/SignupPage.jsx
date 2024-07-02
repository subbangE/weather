import { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginPage.css";

const SignupPage = () => {
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const submitData = (formData) => console.log(formData);

  return (
    <section className="align_center form_page">
      <form onSubmit={handleSubmit(submitData)} className="authentication_form">
        <h2>회원가입</h2>

        <div className="form_inputs">
          <div>
            <label htmlFor="name">이름</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="이름 입력"
              {...register("name", {
                required: "이름을 입력해주세요.",
                minLength: { value: 2, message: "이름은 최소 2자 이상" },
                maxLength: { value: 10, message: "이름은 최대 10자 이하" },
              })}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="이메일 입력"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "올바른 이메일 주소를 입력하세요.",
                },
              })}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="password">패스워드</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="패스워드 입력"
              {...register("password", {
                required: "패스워드를 입력해주세요.",
                minLength: { value: 4, message: "패스워드는 최소 4자 이상." },
              })}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="cpassword">패스워드 확인</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="패스워드 확인 입력"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => {
                  if (watch("password") != value) {
                    return "패스워드가 맞지 않습니다.";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <em className="form_error">{errors.confirmPassword.message}</em>
            )}
          </div>

          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            가입하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignupPage;
