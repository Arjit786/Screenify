"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Sidebar } from "@/components/ui/sidebar"
import { Loader2, Search, Tag, ThumbsUp, MessageCircle, Share2, Copy } from "lucide-react"

// Mock data for content templates
const contentTemplates = [
    {
        id: 1,
        title: "Industry Insight",
        content: "Just read an interesting report on [INDUSTRY TREND]. Key takeaways:\n\n1. [POINT 1]\n2. [POINT 2]\n3. [POINT 3]\n\nWhat are your thoughts on this? How do you see it impacting our industry?\n\n#IndustryInsights #[INDUSTRY]Trends",
        category: "Thought Leadership",
        likes: 156,
        comments: 32,
        shares: 18
    },
    {
        id: 2,
        title: "Team Celebration",
        content: "Proud to announce that our team has just [ACHIEVEMENT]! 🎉\n\nThis wouldn't have been possible without the hard work and dedication of everyone involved. Special shoutout to [TEAM MEMBER] for [SPECIFIC CONTRIBUTION].\n\nWhat's your team's recent win? Let's celebrate our successes together!\n\n#TeamSuccess #[INDUSTRY]Achievements",
        category: "Company Culture",
        likes: 243,
        comments: 56,
        shares: 27
    },
    {
        id: 3,
        title: "Product Launch",
        content: "Exciting news! We've just launched our new [PRODUCT/SERVICE]! 🚀\n\nKey features:\n• [FEATURE 1]\n• [FEATURE 2]\n• [FEATURE 3]\n\nHow it benefits you:\n1. [BENEFIT 1]\n2. [BENEFIT 2]\n3. [BENEFIT 3]\n\nInterested in learning more? Drop a comment or DM me!\n\n#ProductLaunch #Innovation",
        category: "Product Announcement",
        likes: 189,
        comments: 41,
        shares: 35
    },
    {
        id: 4,
        title: "Career Advice",
        content: "After [X] years in [INDUSTRY], here's the career advice I wish I'd received earlier:\n\n1. [ADVICE 1]\n2. [ADVICE 2]\n3. [ADVICE 3]\n4. [ADVICE 4]\n5. [ADVICE 5]\n\nWhat's the best career advice you've ever received? Share in the comments!\n\n#CareerAdvice #ProfessionalGrowth",
        category: "Professional Development",
        likes: 312,
        comments: 87,
        shares: 54
    },
    {
        id: 5,
        title: "Industry Challenge",
        content: "Our industry is facing a significant challenge: [DESCRIBE CHALLENGE]\n\nPotential solutions I've been considering:\n1. [SOLUTION 1]\n2. [SOLUTION 2]\n3. [SOLUTION 3]\n\nWhat are your thoughts? Have you faced similar challenges? How did you overcome them?\n\n#IndustryChallenges #ProblemSolving",
        category: "Thought Leadership",
        likes: 178,
        comments: 63,
        shares: 29
    }
]

export default function ContentInspiration() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const filteredTemplates = contentTemplates.filter(template =>
        (selectedCategory === "all" || template.category === selectedCategory) &&
        (template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const handleUseTemplate = (template: typeof contentTemplates[0]) => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast({
                title: "Template Copied",
                description: "The template has been copied to your clipboard.",
                duration: 3000,
            })
            navigator.clipboard.writeText(template.content)
        }, 1000)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-none bg-blue-700 text-white px-4 py-3">
                    <h1 className="text-2xl font-bold">Content Inspiration</h1>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="container mx-auto p-4 max-w-7xl">
                        <div className="mb-6 space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight">Find Inspiration</h2>
                            <p className="text-muted-foreground">
                                Discover content templates tailored to your industry and needs. Use these as starting points for your LinkedIn posts.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        className="pl-8 w-full"
                                        placeholder="Search templates..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="w-full sm:w-[200px]">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        <SelectItem value="Thought Leadership">Thought Leadership</SelectItem>
                                        <SelectItem value="Company Culture">Company Culture</SelectItem>
                                        <SelectItem value="Product Announcement">Product Announcement</SelectItem>
                                        <SelectItem value="Professional Development">Professional Development</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredTemplates.map((template) => (
                                <Card key={template.id} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{template.title}</CardTitle>
                                        <CardDescription>
                                            <div className="flex items-center space-x-2">
                                                <Tag className="h-4 w-4" />
                                                <span>{template.category}</span>
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{template.content.substring(0, 150)}...</p>
                                    </CardContent>
                                    <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                                        <div className="flex space-x-4 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <ThumbsUp className="h-4 w-4 mr-1" />
                                                {template.likes}
                                            </span>
                                            <span className="flex items-center">
                                                <MessageCircle className="h-4 w-4 mr-1" />
                                                {template.comments}
                                            </span>
                                            <span className="flex items-center">
                                                <Share2 className="h-4 w-4 mr-1" />
                                                {template.shares}
                                            </span>
                                        </div>
                                        <Button
                                            onClick={() => handleUseTemplate(template)}
                                            disabled={isLoading}
                                            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 flex items-center justify-center px-4 py-2 rounded-md w-full sm:w-auto"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            ) : (
                                                <Copy className="h-4 w-4 mr-2" />
                                            )}
                                            {isLoading ? "Copying..." : "Use Template"}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {filteredTemplates.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-xl font-semibold text-gray-600">No templates found</p>
                                <p className="text-gray-500 mt-2">Try adjusting your search or category filter</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}