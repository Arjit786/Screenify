import { NextResponse } from 'next/server';
import { createOptimizedPost } from '@/lib/queries';

export async function POST(request: Request) {
    const { userId, originalContent, tone, targetLength, includeHashtags, includeCTA } = await request.json();

    // In a real application, you would call your AI service here to generate the optimized content
    const optimizedContent = `This is a placeholder for the AI-optimized content. 
  Original length: ${originalContent.split(' ').length} words. 
  Target length: ${targetLength} words. 
  Tone: ${tone}. 
  Include hashtags: ${includeHashtags}. 
  Include CTA: ${includeCTA}.`;

    // Mock engagement estimates
    const estimatedLikes = Math.floor(Math.random() * 200);
    const estimatedViews = Math.floor(Math.random() * 10000);
    const estimatedComments = Math.floor(Math.random() * 50);
    const estimatedShares = Math.floor(Math.random() * 30);

    try {
        const newPost = await createOptimizedPost(
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
            estimatedShares
        );

        return NextResponse.json({ post: newPost[0] }, { status: 201 });
    } catch (error) {
        console.error('Error creating optimized post:', error);
        return NextResponse.json({ error: 'Failed to create optimized post' }, { status: 500 });
    }
}