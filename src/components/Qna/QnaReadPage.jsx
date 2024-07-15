import { useEffect, useState } from "react";
import "./QnaPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const QnaReadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
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

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", id));
      navigate("/qna");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="qna-post">
      <h1>문의 확인</h1>
      <form>
        <div className="formGroup">
          <label htmlFor="title">제목:</label>
          <input type="text" id="title" value={title} disabled />
        </div>
        <div className="formGroup">
          <label htmlFor="content">내용:</label>
          <textarea id="content" value={content} rows="10" disabled />
        </div>
        <div className="btns">
          <Link to={`/update/${id}`} className="link-btn">
            <button className="edit-btn" type="button">
              수정
            </button>
          </Link>
          <button className="delete-btn" type="button" onClick={handleDelete}>
            삭제
          </button>
          <Link to={"/qna"} className="link-btn" type="button">
            <button className="delete-btn">목록</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default QnaReadPage;
