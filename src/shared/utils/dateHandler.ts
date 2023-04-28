export const dateHandler = (publicationTimeInMs: number): string => {
  const publicationDate = new Date(Date.now() - publicationTimeInMs)
  const year = publicationDate.getFullYear()
  const month = (publicationDate.getMonth() + 1).toString().padStart(2, '0')
  const day = publicationDate.getDate().toString().padStart(2, '0')
  const hours = publicationDate.getHours().toString().padStart(2, '0')
  const minutes = publicationDate.getMinutes().toString().padStart(2, '0')
  const seconds = publicationDate.getSeconds().toString().padStart(2, '0')

  return `${year}-${month}-${day} | ${hours}:${minutes}:${seconds}`
}
