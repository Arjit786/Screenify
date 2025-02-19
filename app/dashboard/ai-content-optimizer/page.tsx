"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
    CalendarIcon,
    PenSquare,
    Sparkles,
    ThumbsUp,
    MessageCircle,
    Share2,
    ArrowUpRight,
    ImagePlus,
    X
} from "lucide-react"
import { Sidebar } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
    const [image, setImage] = useState<string | null>(null)
    const [engagement, setEngagement] = useState({
        likes: 0,
        comments: 0,
        shares: 0
    })

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleOptimize = async () => {
        setIsOptimizing(true)
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

    const handleEngagement = (type: 'likes' | 'comments' | 'shares') => {
        setEngagement(prev => ({
            ...prev,
            [type]: prev[type] + 1
        }))
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar />

            <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                    <header className="bg-blue-700 text-white px-4 py-3">
                        <h1 className="text-2xl font-bold">AI Content Optimizer</h1>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4">
                        <div className="grid gap-4 lg:grid-cols-2">
                            {/* Left Column - Editor */}
                            <div className="space-y-4">
                                <Card>
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
                                            <div>
                                                <Label htmlFor="image">Add Image</Label>
                                                <div className="mt-2">
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                    />
                                                    <Label
                                                        htmlFor="image"
                                                        className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                                                    >
                                                        {image ? (
                                                            <div className="relative w-full h-full">
                                                                <img
                                                                    src={image}
                                                                    alt="Upload preview"
                                                                    className="w-full h-full object-cover rounded-lg"
                                                                />
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        setImage(null)
                                                                    }}
                                                                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center">
                                                                <ImagePlus className="w-8 h-8 text-gray-400" />
                                                                <span className="mt-2 text-sm text-gray-500">
                                                                    Click to upload image
                                                                </span>
                                                            </div>
                                                        )}
                                                    </Label>
                                                </div>
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
                            </div>

                            {/* Right Column - LinkedIn Preview */}
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>LinkedIn Preview</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-3">
                                                <Avatar>
                                                    <AvatarImage src="/placeholder.svg" />
                                                    <AvatarFallback>JD</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-semibold">John Doe</div>
                                                    <div className="text-sm text-gray-500">Digital Transformation Leader</div>
                                                </div>
                                            </div>
                                            <div className="space-y-4 pt-2">
                                                <div className="prose prose-sm max-w-none">
                                                    <p className="whitespace-pre-wrap">{optimizedPost || post}</p>
                                                </div>
                                                {image && (
                                                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                                                        <img
                                                            src={image}
                                                            alt="Post image"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                                                    <button
                                                        onClick={() => handleEngagement('likes')}
                                                        className="flex items-center space-x-1 hover:text-blue-600"
                                                    >
                                                        <ThumbsUp className="h-5 w-5" />
                                                        <span>{engagement.likes}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleEngagement('comments')}
                                                        className="flex items-center space-x-1 hover:text-blue-600"
                                                    >
                                                        <MessageCircle className="h-5 w-5" />
                                                        <span>{engagement.comments}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleEngagement('shares')}
                                                        className="flex items-center space-x-1 hover:text-blue-600"
                                                    >
                                                        <Share2 className="h-5 w-5" />
                                                        <span>{engagement.shares}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end space-x-2 mt-4">
                                            <Button variant="outline">
                                                <ArrowUpRight className="mr-2 h-4 w-4" />
                                                Post to LinkedIn
                                            </Button>
                                            <Button variant="outline">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                Schedule Post
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}