'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react'
import Form from '@components/Form';


const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });
  useEffect(() => {
    const promptData = async () => {
      const response = await fetch(`api/prompt/${promptId}`)
      const data = await response.json()
      setPost({ prompt: data.prompt, tag: data.tag })
    }
    if (promptId) promptData()
  }, [promptId]);
  /* Functions */
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if (response.ok) {
        router.push('/profile')
      }
    } catch (error) {
      console.error('Error', error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      >
    </Form>
  )
}

const SuspenseComp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt />
    </Suspense>
  )
}

export default SuspenseComp