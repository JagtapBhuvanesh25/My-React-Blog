import React, { useEffect, useState } from 'react'
import components from '../components'
import appwriteService from '../Appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [post, setPosts] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post)
        }
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  return post ? (
    <div className='py-8'>
      <components.Container>
        <components.PostForm post={post} />
      </components.Container>
    </div>
  ) : null
}

export default EditPost