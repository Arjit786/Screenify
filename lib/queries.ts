import { db } from './db';
import { aiOptimizedPosts, postFeedback, users } from './schema';
import { eq } from 'drizzle-orm';

export async function createOptimizedPost(
    userId: number,
    originalContent: string,
    optimizedContent: string,
    tone: string,
    targetLength: number,
    includeHashtags: boolean,
    includeCTA: boolean,
    estimatedLikes: number,
    estimatedViews: number,
    estimatedComments: number,
    estimatedShares: number
) {
    return db.insert(aiOptimizedPosts).values({
        userId,
        originalContent,
        optimizedContent,
        tone,
        targetLength,
        includeHashtags,
        includeCTA,
        estimatedLikes,
        estimatedViews,
        estimatedComments,
        estimatedShares,
    }).returning();
}

export async function getOptimizedPosts(userId: number) {
    return db.select().from(aiOptimizedPosts).where(eq(aiOptimizedPosts.userId, userId));
}

export async function createPostFeedback(
    postId: number,
    userId: number,
    feedbackType: string,
    feedbackText: string
) {
    return db.insert(postFeedback).values({
        postId,
        userId,
        feedbackType,
        feedbackText,
    }).returning();
}

export async function getPostFeedback(postId: number) {
    return db.select().from(postFeedback).where(eq(postFeedback.postId, postId));
}