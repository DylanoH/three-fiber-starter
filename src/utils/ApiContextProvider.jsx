import React, { createContext, useState, useEffect } from 'react'

export const ApiContext = createContext()

const ApiContextProvider = (props) => {
  // State that holds the API Call response data
  const [posts, setPosts] = useState([])

  // Change the siteUrl to your own database url!
  const siteUrl = 'https://dylanohartman.com/strijp-cms/wp-json/wp/v2/buildings'

  useEffect(() => {
    async function loadposts() {
      const response = await fetch(siteUrl)
      if (!response.ok) {
        console.log('error')
      }
      const posts = await response.json()
      // Change the posts array to the reponse data.
      setPosts(posts)
    }
    loadposts()
  }, [])

  return (
    <ApiContext.Provider value={{ posts }}>
      {props.children}
    </ApiContext.Provider>
  )
}

export default ApiContextProvider
