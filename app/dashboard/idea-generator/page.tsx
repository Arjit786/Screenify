"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Sparkles, ThumbsUp, MessageSquare, Repeat2, BarChart, PenSquare, PlusCircle, CalendarIcon, Zap } from "lucide-react"
import { Sidebar } from "@/components/ui/sidebar"

const industries = [
    "Technology",
    "Marketing",
    "Finance",
    "Healthcare",
    "Education",
    "E-commerce",
    "Real Estate",
    "Manufacturing",
    "Hospitality",
    "Consulting",
]

const contentTypes = [
    "Thought Leadership",
    "Industry News",
    "How-To Guide",
    "Case Study",
    "Personal Story",
    "Data Visualization",
    "Question/Poll",
    "Inspirational Quote",
    "Behind-the-Scenes",
    "Product/Service Highlight",
]

type Idea = {
    id: string
    title: string
    description: string
    contentType: string
}

export default function ContentIdeaGenerator() {
    const [industry, setIndustry] = useState<string>("")
    const [keywords, setKeywords] = useState<string>("")
    const [contentType, setContentType] = useState<string>("")
    const [ideaCount, setIdeaCount] = useState<number>(3)
    const [includeHashtags, setIncludeHashtags] = useState<boolean>(true)
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [generatedIdeas, setGeneratedIdeas] = useState<Idea[]>([])

    const generateIdeas = async () => {
        setIsGenerating(true)
        // Simulating API call to AI service
        await new Promise(resolve => setTimeout(resolve, 2000))

        const newIdeas: Idea[] = Array.from({ length: ideaCount }, (_, i) => ({
            id: `idea-${Date.now()}-${i}`,
            title: `Sample Idea ${i + 1} for ${industry}`,
            description: `This is a ${contentType} post idea related to ${keywords}. It aims to engage your audience and showcase your expertise in the ${industry} industry.`,
            contentType: contentType || contentTypes[Math.floor(Math.random() * contentTypes.length)],
        }))

        setGeneratedIdeas(newIdeas)
        setIsGenerating(false)
    }

    const saveIdea = (idea: Idea) => {
        // Here you would typically save the idea to your backend or local storage
        console.log("Saving idea:", idea)
        // For now, we'll just show an alert
        alert(`Idea "${idea.title}" saved!`)
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                    <header className="bg-blue-700 text-white px-4 py-3">
                        <h1 className="text-2xl font-bold">Content Idea Generator</h1>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Generate Ideas</CardTitle>
                                    <CardDescription>Fill in the details to generate content ideas</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="industry">Industry</Label>
                                        <Select onValueChange={setIndustry}>
                                            <SelectTrigger id="industry">
                                                <SelectValue placeholder="Select your industry" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {industries.map((ind) => (
                                                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                                        <Input
                                            id="keywords"
                                            placeholder="e.g., innovation, leadership, trends"
                                            value={keywords}
                                            onChange={(e) => setKeywords(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contentType">Content Type</Label>
                                        <Select onValueChange={setContentType}>
                                            <SelectTrigger id="contentType">
                                                <SelectValue placeholder="Select content type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {contentTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ideaCount">Number of Ideas</Label>
                                        <Slider
                                            id="ideaCount"
                                            min={1}
                                            max={10}
                                            step={1}
                                            value={[ideaCount]}
                                            onValueChange={(value) => setIdeaCount(value[0])}
                                        />
                                        <div className="text-sm text-gray-500 text-right">{ideaCount} ideas</div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="includeHashtags"
                                            checked={includeHashtags}
                                            onCheckedChange={setIncludeHashtags}
                                        />
                                        <Label htmlFor="includeHashtags">Include Hashtag Suggestions</Label>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={generateIdeas} disabled={isGenerating} className="w-full">
                                        {isGenerating ? (
                                            <>
                                                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                                                Generating Ideas...
                                            </>
                                        ) : (
                                            <>
                                                <Lightbulb className="mr-2 h-4 w-4" />
                                                Generate Ideas
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Generated Ideas</CardTitle>
                                    <CardDescription>Your AI-generated content ideas</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-[400px] pr-4">
                                        {generatedIdeas.length > 0 ? (
                                            <div className="space-y-4">
                                                {generatedIdeas.map((idea) => (
                                                    <Card key={idea.id}>
                                                        <CardHeader>
                                                            <CardTitle className="text-lg">{idea.title}</CardTitle>
                                                            <CardDescription>{idea.contentType}</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <p>{idea.description}</p>
                                                            {includeHashtags && (
                                                                <div className="mt-2">
                                                                    <span className="text-sm font-semibold">Suggested Hashtags: </span>
                                                                    <span className="text-sm text-blue-500">
                                                                        #LinkedInTips #ContentCreation #{industry.replace(/\s+/g, '')}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </CardContent>
                                                        <CardFooter className="flex justify-between">
                                                            <Button variant="outline" size="sm" onClick={() => saveIdea(idea)}>
                                                                <ThumbsUp className="mr-2 h-4 w-4" />
                                                                Save Idea
                                                            </Button>
                                                            <div className="flex space-x-2">
                                                                <Button variant="ghost" size="sm">
                                                                    <MessageSquare className="h-4 w-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm">
                                                                    <Repeat2 className="h-4 w-4" />

                                                                </Button>
                                                                <Button variant="ghost" size="sm">
                                                                    <BarChart className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </CardFooter>
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center text-gray-500 mt-8">
                                                Your generated ideas will appear here
                                            </div>
                                        )}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}