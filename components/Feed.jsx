'use client';
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard 
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [xPosts, setXPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setXPosts(data);
    }
    fetchPosts();
  }, []);

  const handlerSearch = (e) => {
    setSearchText(e.target.value)
    if (e.target.value) filterPrompts(e.target.value);
    else setXPosts(posts);
  }

  const filterPrompts = (strFilter) => {
    const regex = new RegExp(strFilter, "i"); // 'i' flag for case-insensitive search
    const filterPosts = posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
    setXPosts(filterPosts);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search by prompts or username"
          value={searchText}
          onChange={handlerSearch}
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={xPosts}
        handleTagClick={(tag) => { setSearchText(tag); filterPrompts(tag)}}
      />
    </section>
  )
}

export default Feed