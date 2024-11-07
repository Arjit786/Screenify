"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit2, Image, Calendar, Clock, Trash2, Plus } from "lucide-react"
import { Sidebar } from "@/components/ui/sidebar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

const initialAiOptimizerDrafts = [
    {
        id: 1,
        title: "Innovative Tech Solutions",
        content: "Excited to announce our latest breakthrough in AI-powered analytics. Our team has been working tirelessly to develop a solution that will revolutionize how businesses handle big data. Stay tuned for the full reveal next week! #AIInnovation #DataAnalytics",
        date: "2024-03-15",
        time: "14:30",
        author: {
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=32&width=32"
        },
        tags: ["Technology", "AI", "Data Analytics"]
    },
    {
        id: 2,
        title: "Team Building Success",
        content: "Just wrapped up an amazing team-building retreat in the mountains. It's incredible how a change of scenery and some collaborative activities can boost team morale and creativity. Looking forward to implementing our new ideas back at the office! #TeamBuilding #CorporateCulture",
        date: "2024-03-14",
        time: "09:15",
        author: {
            name: "Sarah Lee",
            avatar: "/placeholder.svg?height=32&width=32"
        },
        tags: ["Team Building", "Corporate Culture"]
    },
    {
        id: 3,
        title: "Industry Insights 2024",
        content: "Our annual report on industry trends is out! Key takeaways include the rise of sustainable tech, increased demand for remote work solutions, and the growing importance of data privacy. Download the full report to stay ahead of the curve. #IndustryTrends #FutureOfWork",
        date: "2024-03-13",
        time: "11:45",
        author: {
            name: "Mike Chen",
            avatar: "/placeholder.svg?height=32&width=32"
        },
        tags: ["Industry Trends", "Future of Work", "Technology"]
    },
]

const initialCarouselDrafts = [
    {
        id: 1,
        title: "5 Steps to Better Productivity",
        slides: 5,
        date: "2024-03-15",
        time: "16:00",
        author: {
            name: "Emma Watson",
            avatar: "/placeholder.svg?height=32&width=32"
        },
        tags: ["Productivity", "Work Tips"]
    },
    {
        id: 2,
        title: "The Future of Work",
        slides: 7,
        date: "2024-03-14",
        time: "10:30",
        author: {
            name: "David Kim",
            avatar: "/placeholder.svg?height=32&width=32"
        },
        tags: ["Future of Work", "Remote Work", "Technology"]
    },
    {
        id: 3,
        title: "Mastering Remote Collaboration",
        slides: 6,
        date: "2024-03-13",
        time: "14:15",
        author: {
            name: "Lisa Patel",
            avatar: "/placeholder.svg?height=32&width=32"
        },
        tags: ["Remote Work", "Collaboration", "Team Management"]
    },
]

export default function DraftsPage() {
    const [activeTab, setActiveTab] = useState("ai-optimizer")
    const [aiOptimizerDrafts, setAiOptimizerDrafts] = useState(initialAiOptimizerDrafts)
    const [carouselDrafts, setCarouselDrafts] = useState(initialCarouselDrafts)
    const router = useRouter()
    const { toast } = useToast()

    const handleEditDraft = (type: string, id: number) => {
        if (type === "ai-optimizer") {
            router.push(`/dashboard/ai-content-optimizer?draftId=${id}`)
        } else {
            router.push(`/dashboard/content-to-carousel?draftId=${id}`)
        }
    }

    const handleDeleteDraft = (type: string, id: number) => {
        if (type === "ai-optimizer") {
            setAiOptimizerDrafts(prevDrafts => prevDrafts.filter(draft => draft.id !== id))
        } else {
            setCarouselDrafts(prevDrafts => prevDrafts.filter(draft => draft.id !== id))
        }
        toast({
            title: "Draft deleted",
            description: "The draft has been successfully deleted.",
        })
    }

    const DraftCard = ({ type, draft }: { type: string; draft: any }) => (
        <Card className="mb-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200 bg-white">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl mb-1 text-blue-800">{draft.title}</CardTitle>
                        <CardDescription className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-1 h-4 w-4" />
                            {draft.date}
                            <Clock className="ml-3 mr-1 h-4 w-4" />
                            {draft.time}
                        </CardDescription>
                    </div>
                    <Avatar>
                        <AvatarImage src={draft.author.avatar} alt={draft.author.name} />
                        <AvatarFallback>{draft.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </div>
            </CardHeader>
            <CardContent>
                {type === "ai-optimizer" ? (
                    <p className="text-sm text-gray-600 line-clamp-3">{draft.content}</p>
                ) : (
                    <p className="text-sm text-gray-600">{draft.slides} slides</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                    {draft.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => handleEditDraft(type, draft.id)} className="text-blue-600 border-blue-300 hover:bg-blue-50">
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Draft
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-100">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete this draft?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your draft.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteDraft(type, draft.id)}>
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="px-6 py-8">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-blue-800 mb-2">My Drafts</h1>
                                    <p className="text-lg text-gray-600">Manage and edit your AI-generated content drafts</p>
                                </div>
                            </div>

                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-6">
                                    <TabsTrigger value="ai-optimizer" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                                        <Edit2 className="mr-2 h-4 w-4" />
                                        Content Drafts
                                    </TabsTrigger>
                                    <TabsTrigger value="carousel" className="flex items-center data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                                        <Image className="mr-2 h-4 w-4" />
                                        Carousel Drafts
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="ai-optimizer">
                                    {aiOptimizerDrafts.map((draft) => (
                                        <DraftCard key={draft.id} type="ai-optimizer" draft={draft} />
                                    ))}
                                </TabsContent>
                                <TabsContent value="carousel">
                                    {carouselDrafts.map((draft) => (
                                        <DraftCard key={draft.id} type="carousel" draft={draft} />
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}