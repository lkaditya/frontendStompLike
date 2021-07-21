export interface News {
  imageurl: String,
  title: String,
  comments: String,
  datetime: Date,
  poster:String
}
export interface NewsUpload {
  image: Blob,
  title: string,
  comments: string,
  poster:string
}
export interface User {
  username: string,
  password: string,
  token:string
}
