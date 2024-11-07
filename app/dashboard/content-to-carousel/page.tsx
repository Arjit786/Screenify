"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Sidebar } from "@/components/ui/sidebar"
import {
    CalendarIcon,
    PenSquare,
    PlusCircle,
    BarChart,
    Zap,
    MessageSquare,
    Settings,
    Users,
    Sparkles,
    ArrowLeft,
    ArrowRight,
    Loader2,
    Share,
    Palette,
    LayoutTemplate,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    ArrowUp,
    ArrowDown,
    Twitter,
    Download,
    Save,
    Calendar,
    FolderOpen
} from "lucide-react"
import html2canvas from "html2canvas"

const templates = [
    { name: "Classic", class: "font-serif" },
    { name: "Modern", class: "font-sans" },
    { name: "Bold", class: "font-bold" },
    { name: "Minimalist", class: "font-light tracking-wide" },
]

const designerTemplates = [
    {
        name: "Professional Blue",
        class: "font-serif",
        background: "bg-gradient-to-br from-blue-50 to-blue-100",
        textColor: "text-blue-900",
        accent: "border-blue-200",
        headerStyle: "bg-blue-600 text-white"
    },
    {
        name: "Modern Minimal",
        class: "font-sans",
        background: "bg-gray-50",
        textColor: "text-gray-900",
        accent: "border-gray-200",
        headerStyle: "bg-white text-gray-900 border-b"
    },
    {
        name: "Bold Impact",
        class: "font-bold",
        background: "bg-gradient-to-r from-purple-50 to-pink-50",
        textColor: "text-gray-900",
        accent: "border-purple-200",
        headerStyle: "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
    },
    {
        name: "Creative Flow",
        class: "font-light tracking-wide",
        background: "bg-gradient-to-br from-orange-50 to-yellow-50",
        textColor: "text-gray-800",
        accent: "border-orange-200",
        headerStyle: "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
    },
    {
        name: "Tech Vibe",
        class: "font-mono",
        background: "bg-gradient-to-br from-cyan-50 to-blue-50",
        textColor: "text-gray-900",
        accent: "border-cyan-200",
        headerStyle: "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
    },
    {
        name: "Elegant Black",
        class: "font-sans",
        background: "bg-black",
        textColor: "text-white",
        accent: "border-gray-800",
        headerStyle: "bg-gray-900 text-white border-b border-gray-800"
    }
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
    const [template, setTemplate] = useState(templates[0])
    const [selectedTemplate, setSelectedTemplate] = useState(designerTemplates[0])
    const [fontSize, setFontSize] = useState(16)
    const [horizontalAlignment, setHorizontalAlignment] = useState(horizontalAlignments[1])
    const [verticalAlignment, setVerticalAlignment] = useState(verticalAlignments[1])
    const [isTwitterStyle, setIsTwitterStyle] = useState(false)
    const [twitterName, setTwitterName] = useState("John Doe")
    const [twitterHandle, setTwitterHandle] = useState("@johndoe")
    const [twitterProfileUrl, setTwitterProfileUrl] = useState("/placeholder.svg?height=48&width=48")
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const [scheduleDate, setScheduleDate] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)
    const carouselRef = useRef<HTMLDivElement>(null)
    const { toast } = useToast()

    const [drafts, setDrafts] = useState<Array<{
        id: string;
        content: string;
        template: typeof designerTemplates[0];
        fontSize: number;
        horizontalAlignment: typeof horizontalAlignments[0];
        verticalAlignment: typeof verticalAlignments[0];
        isTwitterStyle: boolean;
        twitterName: string;
        twitterHandle: string;
        twitterProfileUrl: string;
        createdAt: Date;
    }>>([])

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
        await new Promise(resolve => setTimeout(resolve, 2000))
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
        const newDraft = {
            id: Date.now().toString(),
            content,
            template: selectedTemplate,
            fontSize,
            horizontalAlignment,
            verticalAlignment,
            isTwitterStyle,
            twitterName,
            twitterHandle,
            twitterProfileUrl,
            createdAt: new Date()
        }

        setDrafts(prev => [newDraft, ...prev])
        toast({
            title: "Draft Saved",
            description: "Your carousel has been saved to drafts.",
            duration: 3000,
        })
    }

    const loadDraft = (draft: typeof drafts[0]) => {
        setContent(draft.content)
        setSelectedTemplate(draft.template)
        setFontSize(draft.fontSize)
        setHorizontalAlignment(draft.horizontalAlignment)
        setVerticalAlignment(draft.verticalAlignment)
        setIsTwitterStyle(draft.isTwitterStyle)
        setTwitterName(draft.twitterName)
        setTwitterHandle(draft.twitterHandle)
        setTwitterProfileUrl(draft.twitterProfileUrl)
    }

    const schedulePost = () => {
        toast({
            title: "Post Scheduled",
            description: `Your carousel has been scheduled for ${scheduleDate}`,
            duration: 3000,
        })
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-none bg-blue-700 text-white px-4 py-3">
                    <h1 className="text-2xl font-bold">Content-to-Carousel Converter</h1>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="container mx-auto p-4 max-w-7xl">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-4">
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
                                            <div className="space-y-4">
                                                <Label>Designer Templates</Label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {designerTemplates.map((template) => (
                                                        <div
                                                            key={template.name}
                                                            className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${selectedTemplate.name === template.name
                                                                ? 'border-primary ring-2 ring-primary/20'
                                                                : 'border-gray-200 hover:border-primary/50'
                                                                }`}
                                                            onClick={() => setSelectedTemplate(template)}
                                                        >
                                                            <div className={`h-24 rounded-md ${template.background} ${template.accent} border mb-2`}>
                                                                <div className={`h-8 ${template.headerStyle} rounded-t-md px-3 py-2 text-sm`}>
                                                                    {template.name}
                                                                </div>
                                                            </div>
                                                            <p className={`text-sm font-medium ${template.textColor}`}>{template.name}</p>
                                                        </div>
                                                    ))}
                                                </div>
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
                                                <div className="flex gap-4">
                                                    <div className="flex-1">
                                                        <Label className="mb-2 block">Horizontal Alignment</Label>
                                                        <RadioGroup
                                                            defaultValue={horizontalAlignment.value}
                                                            onValueChange={(value) =>
                                                                setHorizontalAlignment(
                                                                    horizontalAlignments.find(a => a.value === value) || horizontalAlignments[1]
                                                                )
                                                            }

                                                        >
                                                            <div className="flex space-x-2">
                                                                {horizontalAlignments.map((a) => (
                                                                    <div key={a.value} className="flex items-center">
                                                                        <RadioGroupItem
                                                                            value={a.value}
                                                                            id={`h-${a.value}`}
                                                                            className="peer sr-only"
                                                                        />
                                                                        <Label
                                                                            htmlFor={`h-${a.value}`}
                                                                            className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                                                        >
                                                                            <a.icon className="h-4 w-4" />
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>
                                                    </div>
                                                    <div className="flex-1">
                                                        <Label className="mb-2 block">Vertical Alignment</Label>
                                                        <RadioGroup
                                                            defaultValue={verticalAlignment.value}
                                                            onValueChange={(value) =>
                                                                setVerticalAlignment(
                                                                    verticalAlignments.find(a => a.value === value) || verticalAlignments[1]
                                                                )
                                                            }
                                                        >
                                                            <div className="flex space-x-2">
                                                                {verticalAlignments.map((a) => (
                                                                    <div key={a.value} className="flex items-center">
                                                                        <RadioGroupItem
                                                                            value={a.value}
                                                                            id={`v-${a.value}`}
                                                                            className="peer sr-only"
                                                                        />
                                                                        <Label
                                                                            htmlFor={`v-${a.value}`}
                                                                            className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                                                        >
                                                                            <a.icon className="h-4 w-4" />
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" className="w-full">
                                                            <FolderOpen className="mr-2 h-4 w-4" />
                                                            Open Drafts
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Saved Drafts</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="max-h-[60vh] overflow-y-auto">
                                                            {drafts.length === 0 ? (
                                                                <p className="text-center text-muted-foreground py-8">
                                                                    No drafts saved yet
                                                                </p>
                                                            ) : (
                                                                <div className="space-y-4">
                                                                    {drafts.map((draft) => (
                                                                        <div
                                                                            key={draft.id}
                                                                            className="flex items-center justify-between border rounded-lg p-4"
                                                                        >
                                                                            <div className="flex-1 mr-4">
                                                                                <p className="font-medium">{draft.template.name}</p>
                                                                                <p className="text-sm text-muted-foreground">
                                                                                    {new Date(draft.createdAt).toLocaleDateString()} at{' '}
                                                                                    {new Date(draft.createdAt).toLocaleTimeString()}
                                                                                </p>
                                                                                <p className="text-sm text-muted-foreground mt-1">
                                                                                    {draft.content.substring(0, 100)}...
                                                                                </p>
                                                                            </div>
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() => {
                                                                                    loadDraft(draft)
                                                                                    setDialogOpen(false)
                                                                                }}
                                                                            >
                                                                                Load Draft
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                                <Button onClick={saveAsDraft} variant="outline" className="w-full">
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Save as Draft
                                                </Button>
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
                            </div>
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Carousel Preview</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {carouselSlides.length > 0 ? (
                                            <div className="space-y-4">
                                                <div
                                                    ref={carouselRef}
                                                    className={`border rounded-lg p-6 h-[400px] flex flex-col justify-${verticalAlignment.value === 'items-start'
                                                        ? 'start'
                                                        : verticalAlignment.value === 'items-end'
                                                            ? 'end'
                                                            : 'center'
                                                        } relative ${selectedTemplate.background}`}
                                                >
                                                    <ScrollArea className="h-full w-full flex">
                                                        <div
                                                            className={`w-full ${verticalAlignment.value} ${selectedTemplate.textColor} ${selectedTemplate.class} ${horizontalAlignment.value}`}
                                                            style={{ fontSize: `${fontSize}px` }}
                                                        >
                                                            {isTwitterStyle && (
                                                                <div className="flex items-center space-x-2 mb-4">
                                                                    <Avatar className="w-12 h-12 border-2 border-white">
                                                                        <AvatarImage src={twitterProfileUrl} alt={twitterName} />
                                                                        <AvatarFallback>{twitterName.charAt(0)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <p className="font-bold text-lg">{twitterName}</p>
                                                                        <p className="text-sm opacity-75">{twitterHandle}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="prose prose-lg max-w-none">
                                                                {carouselSlides[currentSlide]}
                                                            </div>
                                                        </div>
                                                    </ScrollArea>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <Button onClick={prevSlide} variant="outline" size="icon">
                                                        <ArrowLeft className="h-4 w-4" />
                                                    </Button>
                                                    <span className="text-sm text-gray-500">
                                                        Slide {currentSlide + 1} of {carouselSlides.length}
                                                    </span>
                                                    <Button onClick={nextSlide} variant="outline" size="icon">
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button className="flex-1" onClick={downloadAsPNG}>
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download as PNG
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
                                            <div className="h-[400px] flex items-center justify-center text-gray-500">
                                                Your carousel preview will appear here
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}