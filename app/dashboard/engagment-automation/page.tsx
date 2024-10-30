"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Sidebar } from "@/components/ui/sidebar"
import {
    Heart,
    MessageCircle,
    Reply,
    Settings,
    AlertCircle,
    PlayCircle,
    PauseCircle,
    Clock,
    Filter,
    Save,
    Plus,
    Trash2,
    Edit,
} from "lucide-react"

// Auto-reply templates
const replyTemplates = [
    {
        id: 1,
        name: "Thank you",
        content: "Thank you for your insightful comment! 🙏",
        triggers: ["thanks", "great", "awesome"]
    },
    {
        id: 2,
        name: "Question response",
        content: "Great question! Let me get back to you with more details soon.",
        triggers: ["how", "what", "when", "where", "why"]
    },
    {
        id: 3,
        name: "Appreciation",
        content: "Really appreciate your perspective on this! Would love to hear more.",
        triggers: ["agree", "interesting", "good point"]
    }
]

// Comment templates
const commentTemplates = [
    "Great insights! Thanks for sharing 🙌",
    "This is really valuable information 💡",
    "Interesting perspective! Would love to hear more 🤔"
]

export default function EngagementAutomation() {
    // State management
    const [autoLikeEnabled, setAutoLikeEnabled] = useState(false)
    const [autoCommentEnabled, setAutoCommentEnabled] = useState(false)
    const [autoReplyEnabled, setAutoReplyEnabled] = useState(false)
    const [engagementSpeed, setEngagementSpeed] = useState(50)
    const [dailyLimit, setDailyLimit] = useState(100)
    const [targetKeywords, setTargetKeywords] = useState("")
    const [excludeKeywords, setExcludeKeywords] = useState("")
    const [activeTab, setActiveTab] = useState("auto-like")
    const [isAutomationRunning, setIsAutomationRunning] = useState(false)
    const [templates, setTemplates] = useState(commentTemplates)
    const [newTemplate, setNewTemplate] = useState("")
    const { toast } = useToast()

    // Safety settings
    const [minTimeBetweenActions, setMinTimeBetweenActions] = useState(30)
    const [maxActionsPerHour, setMaxActionsPerHour] = useState(50)
    const [cooldownPeriod, setCooldownPeriod] = useState(15)
    const [actionDistribution, setActionDistribution] = useState("balanced")

    // Statistics
    const [stats, setStats] = useState({
        likes: 156,
        comments: 89,
        replies: 22,
        total: 267,
        limit: 500,
        successRate: 98.2,
        failedAttempts: 5
    })

    const handleStartAutomation = () => {
        if (!autoLikeEnabled && !autoCommentEnabled && !autoReplyEnabled) {
            toast({
                title: "No automation enabled",
                description: "Please enable at least one automation feature before starting.",
                variant: "destructive",
            })
            return
        }

        setIsAutomationRunning(true)
        toast({
            title: "Automation started",
            description: "Engagement automation is now running.",
            duration: 3000,
        })
    }

    const handleStopAutomation = () => {
        setIsAutomationRunning(false)
        toast({
            title: "Automation stopped",
            description: "Engagement automation has been paused.",
            duration: 3000,
        })
    }

    const handleSaveSettings = () => {
        toast({
            title: "Settings saved",
            description: "Your automation settings have been updated.",
            duration: 3000,
        })
    }

    const handleAddTemplate = () => {
        if (!newTemplate.trim()) {
            toast({
                title: "Empty template",
                description: "Please enter a template message.",
                variant: "destructive",
            })
            return
        }

        setTemplates([...templates, newTemplate])
        setNewTemplate("")
        toast({
            title: "Template added",
            description: "New template has been added to your collection.",
            duration: 3000,
        })
    }

    const handleDeleteTemplate = (index: number) => {
        const newTemplates = templates.filter((_, i) => i !== index)
        setTemplates(newTemplates)
        toast({
            title: "Template deleted",
            description: "Template has been removed from your collection.",
            duration: 3000,
        })
    }

    const handleResetSettings = () => {
        setEngagementSpeed(50)
        setDailyLimit(100)
        setTargetKeywords("")
        setExcludeKeywords("")
        setAutoLikeEnabled(false)
        setAutoCommentEnabled(false)
        setAutoReplyEnabled(false)
        setMinTimeBetweenActions(30)
        setMaxActionsPerHour(50)
        setCooldownPeriod(15)
        setActionDistribution("balanced")

        toast({
            title: "Settings reset",
            description: "All settings have been reset to default values.",
            duration: 3000,
        })
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex-none bg-blue-700 text-white px-4 py-3">
                    <h1 className="text-2xl font-bold">Engagement Automation</h1>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <div className="container mx-auto p-4 max-w-7xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">Automation Controls</h2>
                                <p className="text-sm text-muted-foreground">
                                    Configure and manage your automated engagement settings
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                {!isAutomationRunning ? (
                                    <Button
                                        onClick={handleStartAutomation}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                        Start Automation
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleStopAutomation}
                                        variant="outline"
                                        className="border-blue-200 hover:bg-blue-50"
                                    >
                                        <PauseCircle className="mr-2 h-4 w-4" />
                                        Stop Automation
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                            <Card className="border-blue-100">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Today's Activity</CardTitle>
                                    <Clock className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-700">
                                        {stats.total}/{stats.limit}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Engagements today ({((stats.total / stats.limit) * 100).toFixed(1)}% of daily limit)
                                    </p>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Likes</span>
                                            <span className="font-medium text-blue-600">{stats.likes}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Comments</span>
                                            <span className="font-medium text-blue-600">{stats.comments}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Replies</span>
                                            <span className="font-medium text-blue-600">{stats.replies}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-100">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                    <Filter className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-700">{stats.successRate}%</div>
                                    <p className="text-xs text-muted-foreground">
                                        Successful engagements in last 24 hours
                                    </p>
                                    <div className="mt-4">
                                        <div className="flex items-center space-x-2 text-sm">
                                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                                            <span className="text-muted-foreground">
                                                {stats.failedAttempts} failed attempts
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-100">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
                                    <Settings className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-700">
                                        {[autoLikeEnabled, autoCommentEnabled, autoReplyEnabled].filter(Boolean).length}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Automation rules currently active
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {autoLikeEnabled && (
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">Auto-Like</Badge>
                                        )}
                                        {autoCommentEnabled && (
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">Auto-Comment</Badge>
                                        )}
                                        {autoReplyEnabled && (
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">Auto-Reply</Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="space-y-4"
                        >
                            <TabsList className="bg-blue-50 text-blue-900">
                                <TabsTrigger
                                    value="auto-like"
                                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                                >
                                    <Heart className="mr-2 h-4 w-4" />
                                    Auto-Like
                                </TabsTrigger>
                                <TabsTrigger
                                    value="auto-comment"
                                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                                >
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Auto-Comment
                                </TabsTrigger>
                                <TabsTrigger
                                    value="auto-reply"
                                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                                >
                                    <Reply className="mr-2 h-4 w-4" />
                                    Auto-Reply
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="auto-like" className="space-y-4">
                                <Card className="border-blue-100">
                                    <CardHeader>
                                        <CardTitle>Auto-Like Settings</CardTitle>
                                        <CardDescription>
                                            Configure when and how your posts should be automatically liked
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="auto-like-toggle">Enable Auto-Like</Label>
                                            <Switch
                                                id="auto-like-toggle"
                                                checked={autoLikeEnabled}
                                                onCheckedChange={setAutoLikeEnabled}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Engagement Speed</Label>
                                            <div className="flex items-center space-x-2">
                                                <Slider
                                                    value={[engagementSpeed]}
                                                    onValueChange={(value) => setEngagementSpeed(value[0])}
                                                    max={100}
                                                    step={1}
                                                    className="flex-1"
                                                />
                                                <span className="w-12 text-sm font-medium">{engagementSpeed}%</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Daily Engagement Limit</Label>
                                            <Input
                                                type="number"
                                                value={dailyLimit}
                                                onChange={(e) => setDailyLimit(parseInt(e.target.value))}
                                                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Target Keywords (comma-separated)</Label>
                                            <Textarea
                                                value={targetKeywords}
                                                onChange={(e) => setTargetKeywords(e.target.value)}
                                                placeholder="innovation, leadership, technology..."
                                                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Exclude Keywords (comma-separated)</Label>

                                            <Textarea
                                                value={excludeKeywords}
                                                onChange={(e) => setExcludeKeywords(e.target.value)}
                                                placeholder="spam, nsfw, gambling..."
                                                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="auto-comment" className="space-y-4">
                                <Card className="border-blue-100">
                                    <CardHeader>
                                        <CardTitle>Auto-Comment Settings</CardTitle>
                                        <CardDescription>
                                            Set up automatic comments for different types of posts
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="auto-comment-toggle">Enable Auto-Comment</Label>
                                            <Switch
                                                id="auto-comment-toggle"
                                                checked={autoCommentEnabled}
                                                onCheckedChange={setAutoCommentEnabled}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Comment Templates</Label>
                                            <div className="space-y-4">
                                                {templates.map((template, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <Input
                                                            value={template}
                                                            className="flex-1 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                                                            readOnly
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => handleDeleteTemplate(index)}
                                                            className="border-blue-200 hover:bg-blue-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <div className="flex items-center space-x-2">
                                                    <Input
                                                        value={newTemplate}
                                                        onChange={(e) => setNewTemplate(e.target.value)}
                                                        placeholder="Enter new template..."
                                                        className="flex-1 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                                                    />
                                                    <Button
                                                        onClick={handleAddTemplate}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="auto-reply" className="space-y-4">
                                <Card className="border-blue-100">
                                    <CardHeader>
                                        <CardTitle>Auto-Reply Settings</CardTitle>
                                        <CardDescription>
                                            Configure automatic replies to comments on your posts
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="auto-reply-toggle">Enable Auto-Reply</Label>
                                            <Switch
                                                id="auto-reply-toggle"
                                                checked={autoReplyEnabled}
                                                onCheckedChange={setAutoReplyEnabled}
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            {replyTemplates.map((template) => (
                                                <Card key={template.id} className="border-blue-100">
                                                    <CardContent className="pt-6">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between">
                                                                <Label>{template.name}</Label>
                                                                <Badge variant="outline" className="border-blue-200 text-blue-700">
                                                                    {template.triggers.length} triggers
                                                                </Badge>
                                                            </div>
                                                            <Textarea
                                                                value={template.content}
                                                                className="min-h-[100px] border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                                                            />
                                                            <div className="flex flex-wrap gap-2">
                                                                {template.triggers.map((trigger, index) => (
                                                                    <Badge
                                                                        key={index}
                                                                        variant="secondary"
                                                                        className="bg-blue-100 text-blue-700"
                                                                    >
                                                                        {trigger}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                            <Button
                                                variant="outline"
                                                className="w-full border-blue-200 hover:bg-blue-50"
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Reply Template
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <Card className="mt-8 border-blue-100">
                            <CardHeader>
                                <CardTitle>Safety Settings</CardTitle>
                                <CardDescription>
                                    Configure safety measures and rate limiting
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Minimum Time Between Actions (seconds)</Label>
                                        <Input
                                            type="number"
                                            value={minTimeBetweenActions}
                                            onChange={(e) => setMinTimeBetweenActions(parseInt(e.target.value))}
                                            className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Maximum Actions Per Hour</Label>
                                        <Input
                                            type="number"
                                            value={maxActionsPerHour}
                                            onChange={(e) => setMaxActionsPerHour(parseInt(e.target.value))}
                                            className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Cool-down Period (minutes)</Label>
                                        <Input
                                            type="number"
                                            value={cooldownPeriod}
                                            onChange={(e) => setCooldownPeriod(parseInt(e.target.value))}
                                            className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Action Distribution</Label>
                                        <Select
                                            value={actionDistribution}
                                            onValueChange={setActionDistribution}
                                        >
                                            <SelectTrigger className="border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                                                <SelectValue placeholder="Select distribution" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="aggressive">Aggressive</SelectItem>
                                                <SelectItem value="balanced">Balanced</SelectItem>
                                                <SelectItem value="conservative">Conservative</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={handleResetSettings}
                                        className="border-blue-200 hover:bg-blue-50"
                                    >
                                        Reset to Defaults
                                    </Button>
                                    <Button
                                        onClick={handleSaveSettings}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Settings
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}