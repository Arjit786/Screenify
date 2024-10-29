import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const aiOptimizedPosts = pgTable('ai_optimized_posts', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    originalContent: text('original_content').notNull(),
    optimizedContent: text('optimized_content').notNull(),
    tone: text('tone').notNull(),
    targetLength: integer('target_length').notNull(),
    includeHashtags: boolean('include_hashtags').notNull(),
    includeCTA: boolean('include_cta').notNull(),
    estimatedLikes: integer('estimated_likes'),
    estimatedViews: integer('estimated_views'),
    estimatedComments: integer('estimated_comments'),
    estimatedShares: integer('estimated_shares'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const postFeedback = pgTable('post_feedback', {
    id: serial('id').primaryKey(),
    postId: integer('post_id').references(() => aiOptimizedPosts.id).notNull(),
    userId: integer('user_id').references(() => users.id).notNull(),
    feedbackType: text('feedback_type').notNull(),
    feedbackText: text('feedback_text'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});