"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, PenSquare, PlusCircle, BarChart, Zap, MessageSquare, Settings, Users, Sparkles, ThumbsUp, Eye, MessageCircle, Share, ArrowUpRight } from "lucide-react"
import { Sidebar } from "@/components/ui/sidebar"

const samplePost = `Just finished an exciting project using AI to optimize supply chain logistics. We've seen a 30% reduction in delivery times and a 20% decrease in costs. #AI #SupplyChain #Innovation

What are your thoughts on the role of AI in improving business operations? Have you implemented any AI solutions in your work?`

export default function AIContentOptimizer() {
    const [post, setPost] = useState(samplePost)
    const [optimizedPost, setOptimizedPost] = useState("")
    const [tone, setTone] = useState("professional")
    const [length, setLength] = useState(50)
    const [includeHashtags, setIncludeHashtags] = useState(true)
    const [includeCTA, setIncludeCTA] = useState(true)
    const [isOptimizing, setIsOptimizing] = useState(false)
    const [feedbackType, setFeedbackType] = useState("")
    const [feedbackText, setFeedbackText] = useState("")

    const handleOptimize = async () => {
        setIsOptimizing(true)
        // In a real application, this would call an AI service
        await new Promise(resolve => setTimeout(resolve, 2000))
        const optimized = `I'm thrilled to share the results of our recent AI-powered supply chain optimization project! 🚀 We've achieved remarkable improvements:

✅ 30% reduction in delivery times
✅ 20% decrease in overall costs

These results highlight the transformative power of AI in streamlining business operations. 

🔍 Key takeaways:
1. AI can significantly enhance efficiency in complex systems
2. Data-driven decision making leads to tangible cost savings
3. Improved delivery times translate to better customer satisfaction

I'm curious to hear from my network:
💡 How are you leveraging AI in your industry?
💡 What challenges do you foresee in implementing AI solutions?
💡 What other areas of business do you think could benefit from AI optimization?

Let's discuss in the comments! Your insights could spark the next big innovation.

#ArtificialIntelligence #SupplyChainOptimization #BusinessInnovation #DataDrivenDecisions #FutureOfBusiness`

        setOptimizedPost(optimized)
        setIsOptimizing(false)
    }

    const handleFeedbackSubmit = () => {
        console.log("Feedback submitted:", { type: feedbackType, text: feedbackText })
        setFeedbackType("")
        setFeedbackText("")
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                    <header className="bg-blue-700 text-white px-4 py-3">
                        <h1 className="text-2xl font-bold">AI Content Optimizer</h1>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Optimize Your LinkedIn Post</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="post">Your LinkedIn Post</Label>
                                            <Textarea
                                                id="post"
                                                value={post}
                                                onChange={(e) => setPost(e.target.value)}
                                                placeholder="Enter your LinkedIn post here..."
                                                className="h-40"
                                            />
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <Label htmlFor="tone">Tone</Label>
                                                <Select value={tone} onValueChange={setTone}>
                                                    <SelectTrigger id="tone">
                                                        <SelectValue placeholder="Select tone" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="professional">Professional</SelectItem>
                                                        <SelectItem value="friendly">Friendly</SelectItem>
                                                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                                                        <SelectItem value="authoritative">Authoritative</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="length">Target Length (words)</Label>
                                                <Slider
                                                    id="length"
                                                    min={50}
                                                    max={300}
                                                    step={10}
                                                    value={[length]}
                                                    onValueChange={(value) => setLength(value[0])}
                                                    className="py-4"
                                                />
                                                <div className="text-center text-sm text-gray-500">{length} words</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="include-hashtags"
                                                    checked={includeHashtags}
                                                    onCheckedChange={setIncludeHashtags}
                                                />
                                                <Label htmlFor="include-hashtags">Include Hashtags</Label>

                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch
                                                    id="include-cta"
                                                    checked={includeCTA}
                                                    onCheckedChange={setIncludeCTA}
                                                />
                                                <Label htmlFor="include-cta">Include Call-to-Action</Label>
                                            </div>
                                        </div>
                                        <Button onClick={handleOptimize} disabled={isOptimizing} className="w-full">
                                            {isOptimizing ? (
                                                <>
                                                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                                                    Optimizing...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="mr-2 h-4 w-4" />
                                                    Optimize with AI
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                            {optimizedPost && (
                                <Card className="md:col-span-2">
                                    <CardHeader>
                                        <CardTitle>Optimized Post</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-white rounded-lg border">
                                                <p className="whitespace-pre-wrap">{optimizedPost}</p>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <ThumbsUp className="mr-1 h-4 w-4" />
                                                    <span>Estimated Likes: 120</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Eye className="mr-1 h-4 w-4" />
                                                    <span>Estimated Views: 5,000</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <MessageCircle className="mr-1 h-4 w-4" />
                                                    <span>Estimated Comments: 25</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Share className="mr-1 h-4 w-4" />
                                                    <span>Estimated Shares: 15</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-end space-x-2">
                                                <Button variant="outline">
                                                    <ArrowUpRight className="mr-2 h-4 w-4" />
                                                    Post to LinkedIn
                                                </Button>
                                                <Button variant="outline">
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    Schedule Post
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}