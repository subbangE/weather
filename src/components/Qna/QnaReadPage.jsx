import { useEffect, useState } from "react";
import "./QnaPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import loadingGIF from "../../assets/loading.gif";

const QnaReadPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [loading, setLoading] = useState(true); // 0.1초 동안 버튼 보이는 문제 해결하기 위해 초기 로딩 상태 추가

  useEffect(() => {
    const userEmail = user.email;
    const usersRef = collection(db, "users");

    // 로그인된 이메일과 동일한 이름 가져오는 쿼리문
    const q = query(usersRef, where("email", "==", userEmail));

    const fetchUser = async () => {
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs[0].data();
      setName(userData.name);
      setLoading(false);
    };

    fetchUser();
  }, [db, user]);

  useEffect(() => {
    const fetchUserAndPost = async () => {
      try {
        const postDoc = await getDoc(doc(db, "posts", id));
        if (postDoc.exists()) {
          setTitle(postDoc.data().title);
          setContent(postDoc.data().content);
          setCreatorName(postDoc.data().creatorName);
        } else {
          console.error("포스터가 존재하지 않습니다😂");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserAndPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", id));
      navigate("/qna");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingGIF} alt="Loading" />
      </div>
    );
  }

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
          {name === creatorName && (
            <>
              <Link to={`/update/${id}`} className="link-btn">
                <button className="edit-btn" type="button">
                  수정
                </button>
              </Link>
              <button
                className="delete-btn"
                type="button"
                onClick={handleDelete}
              >
                삭제
              </button>
            </>
          )}
          <Link to={"/qna"} className="link-btn" type="button">
            <button className="delete-btn">목록</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default QnaReadPage;
