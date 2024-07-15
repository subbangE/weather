import { Link, useNavigate, useParams } from "react-router-dom";
import "./QnaPage.css";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const QnaUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // 해당 id의 게시글 제목, 내용 가져오기
    const fetchPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", id));
        if (postDoc.exists()) {
          setTitle(postDoc.data().title);
          setContent(postDoc.data().content);
        } else {
          console.error("포스터가 존재하지 않습니다😂");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        title: title,
        content: content,
      });
      navigate(`/post/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="qna-post">
      <h1>문의 수정</h1>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            rows="10"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="btns">
          <button className="edit-btn" type="submit">
            완료
          </button>
          <Link to={`/post/${id}`} className="link-btn">
            <button className="delete-btn" type="button">
              뒤로가기
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default QnaUpdatePage;
