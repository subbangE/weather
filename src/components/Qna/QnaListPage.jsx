import { Link } from "react-router-dom";
import "./QnaListPage.css";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
const QnaPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await getDocs(collection(db, "posts"));
        const postsData = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          creatorName: doc.data().creatorName,
          createdAt: doc.data().createdAt.toDate(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("posts 에러", error);
      }
    };

    fetchPosts();
  }, [db]);

  return (
    <div className="board">
      <div className="board-name">
        <h1>게시판</h1>
      </div>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <Link to={`/post/${post.id}`} className="post-link">
            <h2>{post.title}</h2>
          </Link>
          <p className="post-meta">작성자: {post.creatorName}</p>
          <p className="post-meta">작성일: {post.createdAt.toLocaleString()}</p>
        </div>
      ))}
      <div className="qna-btn">
        <Link to={"/create"}>
          <button>문의하기</button>
        </Link>
      </div>
    </div>
  );
};

export default QnaPage;
