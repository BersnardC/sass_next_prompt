'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import Form from '@components/Form';


const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });
  /* Functions */
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          ...post,
          userId: session?.user.id
        })
      })
      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error('Error', error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    >

    </Form>
  )
}

export default CreatePrompt