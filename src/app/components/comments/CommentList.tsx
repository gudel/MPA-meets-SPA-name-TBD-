'use client'
import useSWR from 'swr';

//Type definition.
interface comment {
  id: string;
  author: string;
  text: string;
  created_at: string; //ISO date string from db/server. finding out this bit of info is a pain.
}
const fetcher = (url: string) => fetch(url).then(res => res.json()); //this spits out data. so use data.map to use it.

export default function CommentList() {
  //enforce types: <comment[]> as generic type parameter, calling the type defined above.
  const { data, error, isLoading } = useSWR<comment[]>('/api/comments', fetcher); //fetch data, auto refresh using swr

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading comments</p>;
  if (!data) return null;

return(
  /*sort by commentID and last date created*/
  /*comment: comment === type assertion*/
<ul className="mt-6 space-y-4">  
{data.map((comment: comment) => (
    <li key={comment.id} className="border-p-4">
        <p className="text-sm text-green-400">{comment.author}</p>
        <p>{comment.text}</p>
        <p className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleString()}</p>
    </li>
))}
</ul>
)
}