
export interface FormData {
    title: string | null,
    content: string | null,
    image: string | null,
    category: string | null
}
export interface PostData extends FormData {
    createdAt: string,
    updatedAt: string,
    userId: string,
    slug: string,
    _id: string
}