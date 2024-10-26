"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, PenSquare, PlusCircle, BarChart, Zap, MessageSquare, Settings, Users, Sparkles, ArrowLeft, ArrowRight, Loader2, Share, Palette, LayoutTemplate, AlignLeft, AlignCenter, AlignRight, AlignJustify, ArrowUp, ArrowDown, Twitter, Download, Save, Calendar } from "lucide-react"
import html2canvas from "html2canvas"
import { Sidebar } from "@/components/ui/sidebar"

const colorSchemes = [
    { name: "Blue", bg: "bg-blue-100", text: "text-blue-900", color: "#EBF8FF" },
    { name: "Green", bg: "bg-green-100", text: "text-green-900", color: "#F0FFF4" },
    { name: "Purple", bg: "bg-purple-100", text: "text-purple-900", color: "#FAF5FF" },
    { name: "Orange", bg: "bg-orange-100", text: "text-orange-900", color: "#FFFAF0" },
    { name: "Pink", bg: "bg-pink-100", text: "text-pink-900", color: "#FFF5F7" },
    { name: "Black", bg: "bg-gray-900", text: "text-white", color: "#1A202C" },
    { name: "White", bg: "bg-white", text: "text-gray-900", color: "#FFFFFF" },
]

const templates = [
    { name: "Classic", class: "font-serif" },
    { name: "Modern", class: "font-sans" },
    { name: "Bold", class: "font-bold" },
    { name: "Minimalist", class: "font-light tracking-wide" },
]

const horizontalAlignments = [
    { name: "Left", value: "text-left", icon: AlignLeft },
    { name: "Center", value: "text-center", icon: AlignCenter },
    { name: "Right", value: "text-right", icon: AlignRight },
]

const verticalAlignments = [
    { name: "Top", value: "items-start", icon: ArrowUp },
    { name: "Middle", value: "items-center", icon: AlignJustify },
    { name: "Bottom", value: "items-end", icon: ArrowDown },
]

export default function ContentToCarouselConverter() {
    const [content, setContent] = useState("")
    const [carouselSlides, setCarouselSlides] = useState<string[]>([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isConverting, setIsConverting] = useState(false)
    const [colorScheme, setColorScheme] = useState(colorSchemes[0])
    const [template, setTemplate] = useState(templates[0])
    const [fontSize, setFontSize] = useState(16)
    const [horizontalAlignment, setHorizontalAlignment] = useState(horizontalAlignments[1])
    const [verticalAlignment, setVerticalAlignment] = useState(verticalAlignments[1])
    const [isTwitterStyle, setIsTwitterStyle] = useState(false)
    const [twitterName, setTwitterName] = useState("John Doe")
    const [twitterHandle, setTwitterHandle] = useState("@johndoe")
    const [twitterProfileUrl, setTwitterProfileUrl] = useState("/placeholder.svg?height=48&width=48")
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const [scheduleDate, setScheduleDate] = useState("")
    const carouselRef = useRef<HTMLDivElement>(null)

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedImage(e.target.files[0])
            setTwitterProfileUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    const convertToCarousel = async () => {
        setIsConverting(true)
        // Simulating AI processing
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Simple logic to split content into slides (this would be replaced by actual AI processing)
        const slides = content.split('\n\n').filter(slide => slide.trim() !== '')
        setCarouselSlides(slides)
        setCurrentSlide(0)
        setIsConverting(false)
    }

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % carouselSlides.length)
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + carouselSlides.length) % carouselSlides.length)
    }

    const downloadAsPNG = async () => {
        if (carouselRef.current) {
            const canvas = await html2canvas(carouselRef.current)
            const image = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = image
            link.download = "carousel-slide.png"
            link.click()
        }
    }

    const saveAsDraft = () => {
        // Here you would typically save the current state to a database
        console.log("Saving as draft:", { content, colorScheme, template, fontSize, horizontalAlignment, verticalAlignment, isTwitterStyle, twitterName, twitterHandle, twitterProfileUrl })
        // For now, we'll just show an alert
        alert("Carousel saved as draft!")
    }

    const schedulePost = () => {
        // Here you would typically save the schedule to a database and set up a job to post at the specified time
        console.log("Scheduling post for:", scheduleDate)
        // For now, we'll just show an alert
        alert(`Carousel scheduled for ${scheduleDate}!`)
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                    <header className="bg-blue-700 text-white px-4 py-3">
                        <h1 className="text-2xl font-bold">Content-to-Carousel Converter</h1>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Input Your Content</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="content">Long-form Content or Bullet Points</Label>
                                            <Textarea
                                                id="content"
                                                placeholder="Enter your content here. Separate major points with blank lines for better segmentation."
                                                value={content}
                                                onChange={handleContentChange}
                                                className="h-[200px]"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="twitter-style"
                                                checked={isTwitterStyle}
                                                onCheckedChange={setIsTwitterStyle}
                                            />
                                            <Label htmlFor="twitter-style">Twitter-style Post</Label>
                                        </div>
                                        {isTwitterStyle && (
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="twitter-name">Name</Label>
                                                    <Input
                                                        id="twitter-name"

                                                        value={twitterName}
                                                        onChange={(e) => setTwitterName(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="twitter-handle">Handle</Label>
                                                    <Input
                                                        id="twitter-handle"
                                                        value={twitterHandle}
                                                        onChange={(e) => setTwitterHandle(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="twitter-profile-image">Profile Image</Label>
                                                    <div className="flex items-center space-x-2">
                                                        <Input
                                                            id="twitter-profile-image"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="flex-1"
                                                        />
                                                        {uploadedImage && (
                                                            <img
                                                                src={URL.createObjectURL(uploadedImage)}
                                                                alt="Uploaded profile"
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <Label>Color Scheme</Label>
                                            <RadioGroup
                                                defaultValue={colorScheme.name}
                                                onValueChange={(value) => setColorScheme(colorSchemes.find(c => c.name === value) || colorSchemes[0])}
                                                className="grid grid-cols-4 gap-2"
                                            >
                                                {colorSchemes.map((scheme) => (
                                                    <div key={scheme.name} className="flex items-center space-x-2">
                                                        <RadioGroupItem value={scheme.name} id={scheme.name} className="peer sr-only" />
                                                        <Label
                                                            htmlFor={scheme.name}
                                                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                                        >
                                                            <div
                                                                className="w-6 h-6 rounded-full border border-gray-300"
                                                                style={{ backgroundColor: scheme.color }}
                                                            />
                                                            <span className="mt-1 text-xs">{scheme.name}</span>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="template">Template</Label>
                                            <Select onValueChange={(value) => setTemplate(templates.find(t => t.name === value) || templates[0])}>
                                                <SelectTrigger id="template">
                                                    <SelectValue placeholder="Select a template" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {templates.map((t) => (
                                                        <SelectItem key={t.name} value={t.name}>{t.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="font-size">Font Size</Label>
                                            <div className="flex items-center space-x-2">
                                                <Slider
                                                    id="font-size"
                                                    min={12}
                                                    max={24}
                                                    step={1}
                                                    value={[fontSize]}
                                                    onValueChange={(value) => setFontSize(value[0])}
                                                />
                                                <span className="text-sm font-medium">{fontSize}px</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Horizontal Alignment</Label>
                                            <RadioGroup defaultValue={horizontalAlignment.value} onValueChange={(value) => setHorizontalAlignment(horizontalAlignments.find(a => a.value === value) || horizontalAlignments[1])}>
                                                <div className="flex space-x-2">
                                                    {horizontalAlignments.map((a) => (
                                                        <RadioGroupItem key={a.value} value={a.value} id={`h-${a.value}`} className="peer sr-only" />
                                                    ))}
                                                    {horizontalAlignments.map((a) => (
                                                        <Label
                                                            key={a.value}
                                                            htmlFor={`h-${a.value}`}
                                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                        >
                                                            <a.icon className="mb-2 h-6 w-6" />
                                                            {a.name}
                                                        </Label>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Vertical Alignment</Label>
                                            <RadioGroup defaultValue={verticalAlignment.value} onValueChange={(value) => setVerticalAlignment(verticalAlignments.find(a => a.value === value) || verticalAlignments[1])}>
                                                <div className="flex space-x-2">
                                                    {verticalAlignments.map((a) => (
                                                        <RadioGroupItem key={a.value} value={a.value} id={`v-${a.value}`} className="peer sr-only" />
                                                    ))}
                                                    {verticalAlignments.map((a) => (
                                                        <Label
                                                            key={a.value}
                                                            htmlFor={`v-${a.value}`}
                                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                        >
                                                            <a.icon className="mb-2 h-6 w-6" />
                                                            {a.name}
                                                        </Label>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        <Button onClick={convertToCarousel} disabled={isConverting || content.trim() === ""}>
                                            {isConverting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Converting...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles className="mr-2 h-4 w-4" />
                                                    Convert to Carousel
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Carousel Preview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {carouselSlides.length > 0 ? (
                                        <div className="space-y-4">
                                            <div
                                                ref={carouselRef}
                                                className={`border rounded-lg p-6 h-[300px] flex flex-col justify-${verticalAlignment.value === 'items-start' ? 'start' : verticalAlignment.value === 'items-end' ? 'end' : 'center'} relative ${colorScheme.bg}`}
                                            >
                                                <ScrollArea className="h-full w-full flex">
                                                    <div className={`w-full ${verticalAlignment.value} ${colorScheme.text} ${template.class} ${horizontalAlignment.value}`} style={{ fontSize: `${fontSize}px` }}>
                                                        {isTwitterStyle && (
                                                            <div className="flex items-center space-x-2 mb-2">
                                                                <Avatar className="w-10 h-10">
                                                                    <AvatarImage src={twitterProfileUrl} alt={twitterName} />
                                                                    <AvatarFallback>{twitterName.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <p className="font-bold">{twitterName}</p>
                                                                    <p className="text-sm text-gray-500">{twitterHandle}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {carouselSlides[currentSlide]}
                                                    </div>
                                                </ScrollArea>
                                                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-sm">
                                                    Slide {currentSlide + 1} of {carouselSlides.length}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <Button onClick={prevSlide} variant="outline" size="icon">
                                                    <ArrowLeft className="h-4 w-4" />
                                                </Button>
                                                <Button onClick={nextSlide} variant="outline" size="icon">
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button className="flex-1" onClick={downloadAsPNG}>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download as PNG
                                                </Button>
                                                <Button className="flex-1" onClick={saveAsDraft}>
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Save as Draft
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button className="flex-1">
                                                            <Calendar className="mr-2 h-4 w-4" />
                                                            Schedule Post
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Schedule Your Post</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="py-4">
                                                            <Label htmlFor="schedule-date">Select Date and Time</Label>
                                                            <Input
                                                                id="schedule-date"
                                                                type="datetime-local"
                                                                value={scheduleDate}
                                                                onChange={(e) => setScheduleDate(e.target.value)}
                                                            />
                                                        </div>
                                                        <Button onClick={schedulePost}>Confirm Schedule</Button>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                            <Button className="w-full">
                                                <Share className="mr-2 h-4 w-4" />
                                                Post Carousel to LinkedIn
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                                            Your carousel preview will appear here
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}