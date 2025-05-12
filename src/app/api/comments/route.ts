 import { sql } from "@vercel/postgres";
 import { NextResponse } from "next/server";
 import {z} from 'zod';
 import xss from "xss";

 //TODO: define more errors.

 const CommentSchema = z.object({
    author: z.string().min(1).max(100),
    text: z.string().min(1).max(2000),
  });



 export async function GET() {
    const result = await sql`
    SELECT * FROM comments 
    ORDER BY created_at DESC`
    return NextResponse.json(result.rows)
 }

 export async function POST(request: Request) {
    try{
        const body = await request.json()
        const parsed = CommentSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
      }

        // Sanitize content
        const text = xss(parsed.data.text);
        const author = xss(parsed.data.author);

        // run sql operations(?)
        const result = await sql`
        INSERT INTO comments (text, author)
        VALUES (${text}, ${author})
        RETURNING id, text, author, created_at
        `

        return NextResponse.json(result.rows[0], {status: 201})
    } catch (error) {
        console.error('Error inserting comment:', error)
        return NextResponse.json({error:'Internal Server Error'}, {status:500})
    }
 }