export interface News {
  imageurl: String,
  title: String,
  comments: String
}
export interface NewsUpload {
  image: Blob,
  title: string,
  comments: string
}
export interface User {
  username: string,
  password: string,
  token:string
}