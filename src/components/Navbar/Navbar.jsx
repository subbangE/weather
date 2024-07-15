import { useState } from "react";
import LinkWithTitle from "./LinkWithTitle";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 입력 필드 값 변경 이벤트 핸들러
  const handleChange = (e) => {
    setSearch(e.target.value); // 입력된 값으로 상태를 업데이트
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/home?search=${search}`);
    setSearch("");
  };

  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">날씨요정</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="지역 검색 (ex. london, seoul 등)"
            value={search}
            onChange={handleChange}
          />
          <button type="submit" className="search_button">
            검색
          </button>
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithTitle title="홈" link="/" />
        {!user && (
          <>
            <LinkWithTitle title="로그인" link="/login" />
            <LinkWithTitle title="회원가입" link="/signup" />
          </>
        )}
        {user && (
          <>
            <LinkWithTitle title="문의" link="/qna" />
            <LinkWithTitle title="로그아웃" link="/logout" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
