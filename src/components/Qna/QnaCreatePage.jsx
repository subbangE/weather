import { useEffect, useState } from "react";
import "./QnaPage.css";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const QnaPostPage = ({ user }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  // 현재 로그인된 사용자의 이름(users 컬렉션에 있는 name) 가져오기
  useEffect(() => {
    const userEmail = user.email;
    const usersRef = collection(db, "users");

    // 로그인된 이메일과 동일한 이름 가져오는 쿼리문
    const q = query(usersRef, where("email", "==", userEmail));

    const fetchUserData = async () => {
      const querySnapshot = await getDocs(q);

      // 일치하는 문서가 있다면 name 필드 값 설정
      querySnapshot.forEach((doc) => {
        setName(doc.data().name);
      });
    };

    fetchUserData();
  }, [db]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        content: content,
        createdAt: serverTimestamp(),
        creatorName: name,
      });

      // 초기화
      setTitle("");
      setContent("");

      window.location = "/qna";
    } catch (error) {
      console.log("에러 발생: ", error);
    }
  };

  return (
    <div className="qna-post">
      <h1>문의 작성</h1>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            required
          />
        </div>
        <button className="post-btn" type="submit">
          등록
        </button>
      </form>
    </div>
  );
};

export default QnaPostPage;
