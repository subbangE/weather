import { Link } from "react-router-dom";
import "./QnaPage.css";
const QnaPage = () => {
  const posts = [
    {
      id: 1,
      title: "첫 번째 게시물 제목",
      author: "John Doe",
      date: "2024-07-04",
      content: "첫 번째 게시물의 내용입니다.",
    },
    {
      id: 2,
      title: "두 번째 게시물 제목",
      author: "Jane Smith",
      date: "2024-07-03",
      content: "두 번째 게시물의 내용입니다.",
    },
  ];

  return (
    <div className="board">
      <div className="board-name">
        <h1>게시판</h1>
      </div>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <Link to={`/post/${post.id}`} className="post-link">
            <h2>{post.title}</h2>
            <p className="post-meta">작성자: {post.author}</p>
            <p className="post-meta">작성일: {post.date}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default QnaPage;
