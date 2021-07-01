export const linkPost = (posts, name) => {
  // find name in posts
  const obj = posts?.find((item) => item?.acf?.name === name)

  // return post data
  return obj
}
