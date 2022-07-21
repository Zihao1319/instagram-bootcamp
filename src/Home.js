import React, { useEffect, useState } from "react";
import { onChildAdded, push, ref as refDatabase, set } from "firebase/database";
import {
  getDownloadURL,
  ref as refStorage,
  uploadBytes,
} from "firebase/storage";

import { database, storage } from "./firebase";

const POSTS_FOLDER_NAME = "posts";
const IMAGES_FOLDER_NAME = "post-images";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    image: { value: "", file: undefined },
    caption: "",
  });

  const handleChangeText = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeFile = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: { value: e.target.value, file: e.target.files[0] },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ts = new Date().toUTCString();
    const fileRef = refStorage(storage, `${IMAGES_FOLDER_NAME}/${ts}`);
    console.log(fileRef);
    console.log(formData.image.file);
    await uploadBytes(fileRef, formData.image.file);
    const imageDownloadUrl = await getDownloadURL(fileRef);
    const postsListRef = refDatabase(database, POSTS_FOLDER_NAME);
    console.log(postsListRef);
    const newPostsRef = push(postsListRef);
    set(newPostsRef, {
      caption: formData.caption,
      ts,
      imageDownloadUrl,
    });
  };

  useEffect(() => {
    const messagesRef = refDatabase(database, POSTS_FOLDER_NAME);
    onChildAdded(messagesRef, (data) => {
      setPosts((prev) => [
        ...prev,
        {
          key: data.key,
          val: { caption: data.val().caption, ts: data.val().ts },
        },
      ]);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <>Hello, {}</>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="image">Image file:</label>
            <input
              type="file"
              name="image"
              value={formData.image.value}
              onChange={handleChangeFile}
            />
          </div>
          <div>
            <label htmlFor="caption">Caption:</label>
            <input
              type="text"
              name="caption"
              value={formData.caption}
              onChange={handleChangeText}
            />
          </div>
          <input type="submit" name="submit" />
        </form>
        {posts &&
          // TODO: format posts
          posts.map((post) => {
            return <div>{post.val.caption}</div>;
          })}
      </header>
    </div>
  );
};
export default Home;
I;
