import CommentForm from "../components/comments/CommentForm";
import CommentList from "../components/comments/CommentList";


export default async function CommentPage() {
    return(
        <div className="flex flex-col md:flex-row max-w-auto min-h-screen mx-auto py-8 gap-6">
            <div className="md:w-[60%] flex-1 overflow-y-auto">
            <h1 className="text-xl font-bold mb-4">Comments</h1>
            <CommentList />
            </div>
            {/*Crude method to force the CommentForm to float, but it's a calculated tradeoff*/}
            <div className="md:w-[40%] md:fixed md:top-35 md:right-4 md:justify-start">
            <h1 className="text-2xl font-bold mt-4 mb-2">Leave a comment!</h1>
            <CommentForm />
            </div>
        </div>
    )
}