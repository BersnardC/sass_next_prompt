'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    }
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push('update-prompt?id=' + post._id);
  }

  const handleDelete = async (post) => {
    const xconfirm = confirm('Are you sure delete this prompt?');
    if (xconfirm) {
      try {
        const response = await fetch(`api/prompt/${post._id.toString()}`, {method: 'DELETE'});
        const filtered = posts.filter(p => p._id !== post._id);
        setPosts(filtered);
      } catch (error) {
        console.log('Error delete', error);
      }
    }
  }
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile