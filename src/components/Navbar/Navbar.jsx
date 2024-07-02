import LinkWithTitle from "./LinkWithTitle";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">날씨요정</h1>
        <form className="align_center navbar_form">
          <input
            type="text"
            className="navbar_search"
            placeholder="지역 검색"
          />
          <button type="submit" className="search_button">
            검색
          </button>
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithTitle title="홈" link="/" />
        <LinkWithTitle title="로그인" link="/login" />
        <LinkWithTitle title="회원가입" link="/signup" />
        <LinkWithTitle title="문의" link="/qna" />
        <LinkWithTitle title="로그아웃" link="/logout" />
      </div>
    </nav>
  );
};

export default Navbar;
