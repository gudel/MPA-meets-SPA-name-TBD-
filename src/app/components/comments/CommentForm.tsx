'use client'
import {useState} from 'react';
import useSWR from 'swr';
import { z } from 'zod';

export default function CommentForm() {
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const fetcher = (url: string) => fetch(url).then(res => res.json()); //fetcher so submit triggers rehdyration.
    const { mutate } = useSWR("/api/comments", fetcher);
    const CommentSchema = z.object({
        text: z.string().min(1, "Text required").max(2000, "comment too long!"),
        author: z.string().min(1, "Author required").max(200, "name too long!"),
    });
    //duplicated schema handler for front and back end. Correct me if this is the wrong way to go about it.
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (status === 'loading') return; ///prevents race submit conditions.
        setStatus('loading')
        setErrorMessage('')
        
        try{
        //validate with zod
        const validation = CommentSchema.safeParse({ author, text });
        if (!validation.success) {
          setStatus("error");
          setErrorMessage("Invalid input.");
          return;
        }

        /*Async fetch operation+ destructuring */
        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ author, text })
        })
        
        const data = await res.json()

        if(!res.ok) {
            throw new Error(data.message || 'submission failed')
        }
            setStatus('success')
            setAuthor('')
            setText('')
            //rehydrate on submit
            mutate() 
        } catch(error:unknown) {
            setStatus('error')
            ///update error message after catching an error.
            const message = error instanceof Error ? error.message : 'Unexpected error'
            setErrorMessage(message)
            ///catch error block. receive and parse error data from server/backend.
        }
    }

    return(
        <form onSubmit={handleSubmit} name='comment field' className="flex flex-col gap-2">
            <input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            id='Author Name'
            className="border px-2 py-1"
            />
            <textarea
            placeholder="Your comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            id='Comment Field'
            className="border px-2 py-1"
            />
            <button type="submit" disabled={status==='loading'} className='bg-black opacity-60 text-white rounded-sm px-4 py-2 disabled:cursor-not-allowed'>
                Submit
            </button>
            {/*conditional renders for POST status*/}
            {status === 'loading' && <p>Submitting...</p>}
            {status === 'error' && <p>{errorMessage}</p>}
            {status === 'success' && <p>Success!!</p>}
        </form>
    )
}