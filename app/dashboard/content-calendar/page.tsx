"use client"

import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight, PlusCircle, Search, Pencil, Trash2, AlertCircle } from "lucide-react"
import { Sidebar } from "@/components/ui/sidebar"

// Mock data for scheduled posts
const initialScheduledPosts = [
    { id: '1', date: '2024-10-21', time: '09:00', content: 'Exciting news! We\'re launching a new product next week. Stay tuned! #NewProduct #Innovation', type: 'text' },
    { id: '2', date: '2024-10-22', time: '14:00', content: 'Check out our latest blog post on industry trends. Link in bio. #IndustryInsights #BlogPost', type: 'link' },
    { id: '3', date: '2024-10-23', time: '11:00', content: 'Team building activity - rock climbing!', type: 'image' },
    { id: '4', date: '2024-10-24', time: '16:00', content: 'We\'re hiring! Join our dynamic team and be part of something great. #JobOpening #Careers', type: 'text' },
    { id: '5', date: '2024-10-25', time: '10:00', content: 'Throwback to last year\'s company retreat. Great memories! #TBT #CompanyCulture', type: 'image' },
]

type Post = {
    id: string
    date: string
    time: string
    content: string
    type: string
}

export default function ContentCalendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [filter, setFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [scheduledPosts, setScheduledPosts] = useState(initialScheduledPosts)
    const [newPost, setNewPost] = useState({ type: 'text', content: '', date: '', time: '' })
    const [editingPost, setEditingPost] = useState<Post | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [postToDelete, setPostToDelete] = useState<Post | null>(null)
    const { toast } = useToast()

    const filteredPosts = scheduledPosts.filter(post => {
        const matchesFilter = filter === 'all' || post.type === filter
        const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

    const getPostsForDate = (date: Date) => {
        return filteredPosts.filter(post => post.date === format(date, 'yyyy-MM-dd'))
    }

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

    const handleNewPostSubmit = () => {
        const id = (scheduledPosts.length + 1).toString()
        const newScheduledPost = { ...newPost, id }
        setScheduledPosts([...scheduledPosts, newScheduledPost])
        setNewPost({ type: 'text', content: '', date: '', time: '' })
        toast({
            title: "Post Scheduled",
            description: "Your post has been scheduled successfully.",
            duration: 3000,
        })
    }

    const handleEditPost = (post: Post) => {
        setEditingPost(post)
        setIsEditDialogOpen(true)
    }

    const handleUpdatePost = () => {
        if (!editingPost) return

        setScheduledPosts(posts =>
            posts.map(post =>
                post.id === editingPost.id ? editingPost : post
            )
        )
        setEditingPost(null)
        setIsEditDialogOpen(false)
        toast({
            title: "Post Updated",
            description: "Your post has been updated successfully.",
            duration: 3000,
        })
    }

    const handleDeletePost = (post: Post) => {
        setPostToDelete(post)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = () => {
        if (!postToDelete) return

        setScheduledPosts(posts =>
            posts.filter(post => post.id !== postToDelete.id)
        )
        setPostToDelete(null)
        setIsDeleteDialogOpen(false)
        toast({
            title: "Post Deleted",
            description: "Your post has been deleted successfully.",
            duration: 3000,
        })
    }

    const PostCard = ({ post }: { post: Post }) => (
        <Card className="group relative">
            <CardContent className="p-2">
                <div className="flex justify-between items-center mb-1">
                    <Badge>{post.type}</Badge>
                    <span className="text-sm text-gray-500">{post.time}</span>
                </div>
                <p className="text-sm">{post.content}</p>

                {/* Hover actions */}
                <div className="absolute top-2 right-2 hidden group-hover:flex space-x-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleEditPost(post)
                        }}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePost(post)
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-none bg-blue-700 text-white px-4 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Content Calendar</h1>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="container mx-auto p-4 max-w-7xl">
                        <div className="mb-4 flex justify-between items-center">
                            <div className="flex space-x-2">
                                <Select value={filter} onValueChange={setFilter}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All types</SelectItem>
                                        <SelectItem value="text">Text</SelectItem>
                                        <SelectItem value="image">Image</SelectItem>
                                        <SelectItem value="link">Link</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="relative">
                                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        className="pl-8"
                                        placeholder="Search posts"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        New Post
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Create New Post</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="post-type" className="text-right">
                                                Type
                                            </Label>
                                            <Select
                                                value={newPost.type}
                                                onValueChange={(value) => setNewPost({ ...newPost, type: value })}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select post type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="text">Text</SelectItem>
                                                    <SelectItem value="image">Image</SelectItem>
                                                    <SelectItem value="link">Link</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="content" className="text-right">
                                                Content
                                            </Label>
                                            <Textarea
                                                id="content"
                                                className="col-span-3"
                                                value={newPost.content}
                                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="post-date" className="text-right">
                                                Date
                                            </Label>
                                            <Input
                                                id="post-date"
                                                type="date"
                                                className="col-span-3"
                                                value={newPost.date}
                                                onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="post-time" className="text-right">
                                                Time
                                            </Label>
                                            <Input
                                                id="post-time"
                                                type="time"
                                                className="col-span-3"
                                                value={newPost.time}
                                                onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleNewPostSubmit}>
                                            Schedule Post
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {format(currentMonth, 'MMMM yyyy')}
                                </CardTitle>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={prevMonth}
                                    >
                                        <span className="sr-only">Previous month</span>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={nextMonth}
                                    >
                                        <span className="sr-only">Next month</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-7 gap-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <div key={day} className="text-center font-medium text-sm py-1">
                                            {day}
                                        </div>
                                    ))}
                                    {monthDays.map((day, dayIdx) => {
                                        const postsForDay = getPostsForDate(day)
                                        return (
                                            <Popover key={day.toString()}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={`h-14 w-full justify-start ${!isSameMonth(day, currentMonth)
                                                            ? 'text-gray-400'
                                                            : isSameDay(day, new Date())
                                                                ? 'bg-blue-100 text-blue-600 font-semibold'
                                                                : ''
                                                            }`}
                                                    >
                                                        <div className="flex flex-col items-start">
                                                            <span className="text-sm">{format(day, 'd')}</span>
                                                            {postsForDay.length > 0 && (
                                                                <Badge variant="secondary" className="mt-1">
                                                                    {postsForDay.length} post{postsForDay.length > 1 ? 's' : ''}
                                                                </Badge>
                                                            )}
                                                        </div>

                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-80">
                                                    <div className="space-y-2">
                                                        <h3 className="font-semibold">{format(day, 'MMMM d, yyyy')}</h3>
                                                        {postsForDay.length > 0 ? (
                                                            <div className="space-y-2">
                                                                {postsForDay.map((post) => (
                                                                    <PostCard key={post.id} post={post} />
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm text-gray-500">
                                                                No posts scheduled for this day.
                                                            </p>
                                                        )}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-type" className="text-right">
                                Type
                            </Label>
                            <Select
                                value={editingPost?.type}
                                onValueChange={(value) =>
                                    setEditingPost(prev => prev ? { ...prev, type: value } : null)
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select post type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="image">Image</SelectItem>
                                    <SelectItem value="link">Link</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-content" className="text-right">
                                Content
                            </Label>
                            <Textarea
                                id="edit-content"
                                className="col-span-3"
                                value={editingPost?.content}
                                onChange={(e) =>
                                    setEditingPost(prev => prev ? { ...prev, content: e.target.value } : null)
                                }
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-date" className="text-right">
                                Date
                            </Label>
                            <Input
                                id="edit-date"
                                type="date"
                                className="col-span-3"
                                value={editingPost?.date}
                                onChange={(e) =>
                                    setEditingPost(prev => prev ? { ...prev, date: e.target.value } : null)
                                }
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-time" className="text-right">
                                Time
                            </Label>
                            <Input
                                id="edit-time"
                                type="time"
                                className="col-span-3"
                                value={editingPost?.time}
                                onChange={(e) =>
                                    setEditingPost(prev => prev ? { ...prev, time: e.target.value } : null)
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdatePost}>
                            Update Post
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this post? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2 py-3">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-gray-500">
                            This will permanently delete the scheduled post.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete Post
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}