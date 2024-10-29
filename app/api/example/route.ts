import { db } from '@/lib/db';
import { users } from '@/lib/schema';

export async function GET() {
    const allUsers = await db.select().from(users);
    return Response.json(allUsers);
}