"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Briefcase, Target, PartyPopper, Smile, Meh, Frown, Link } from "lucide-react"

const professions = [
    "Software Developer",
    "Marketing Specialist",
    "Sales Representative",
    "Product Manager",
    "Data Scientist",
    "Designer",
    "Content Creator",
    "Entrepreneur",
    "Human Resources Professional",
    "Other",
]

const interestAreas = [
    { name: "Technology", icon: "💻" },
    { name: "Business", icon: "💼" },
    { name: "Marketing", icon: "📣" },
    { name: "Finance", icon: "💰" },
    { name: "Health & Wellness", icon: "🧘" },
    { name: "Education", icon: "📚" },
    { name: "Arts & Entertainment", icon: "🎨" },
    { name: "Science", icon: "🔬" },
    { name: "Sports", icon: "⚽" },
    { name: "Travel", icon: "✈️" },
]

const formSchema = z.object({
    profession: z.string().min(1, "Please select your profession"),
    interests: z.array(z.string()).min(1, "Please select at least one interest"),
    goals: z.array(z.string()).min(1, "Please select at least one goal"),
    postingFrequency: z.enum(["daily", "weekly", "biweekly", "monthly"]),
})

export default function OnboardingForm() {
    const [step, setStep] = useState(1)
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            profession: "",
            interests: [],
            goals: [],
            postingFrequency: "weekly",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        // Here you would typically send this data to your backend
        // For now, we'll just redirect to the dashboard
        router.push("/dashboard")
    }

    const totalSteps = 2
    const progress = (step / totalSteps) * 100

    const getStepEmoji = (currentStep: number) => {
        switch (currentStep) {
            case 1:
                return <Briefcase className="w-8 h-8 text-blue-600" />
            case 2:
                return <Target className="w-8 h-8 text-blue-600" />
            default:
                return null
        }
    }

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Progress value={progress} className="mb-8 h-2 bg-gray-200" />
            <Card className="border-t-4 border-t-blue-600 shadow-lg bg-white">
                <CardHeader className="bg-gray-50 rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-gray-800">Welcome to LinkedIn Automation Pro</CardTitle>
                        {getStepEmoji(step)}
                    </div>
                    <CardDescription className="text-gray-600">Let's personalize your experience (Step {step} of {totalSteps})</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {step === 1 && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="profession"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold text-gray-700">What's your profession? 👔</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-white border-2 border-gray-300 focus:border-blue-600 transition-colors">
                                                            <SelectValue placeholder="Select your profession" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {professions.map((profession) => (
                                                            <SelectItem key={profession} value={profession}>
                                                                {profession}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="interests"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold text-gray-700">What are your interests? 🌈</FormLabel>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {interestAreas.map((interest) => (
                                                        <FormField
                                                            key={interest.name}
                                                            control={form.control}
                                                            name="interests"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={interest.name}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(interest.name)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, interest.name])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== interest.name
                                                                                            )
                                                                                        )
                                                                                }}
                                                                                className="border-2 border-gray-300 text-blue-600 focus:border-blue-600"
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal text-gray-700">
                                                                            {interest.icon} {interest.name}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="goals"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold text-gray-700">What are your goals on LinkedIn? 🎯</FormLabel>
                                                <div className="space-y-2">
                                                    {["Networking", "Job Hunting", "Lead Generation", "Brand Building", "Thought Leadership"].map((goal) => (
                                                        <FormField
                                                            key={goal}
                                                            control={form.control}
                                                            name="goals"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={goal}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(goal)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...field.value, goal])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== goal
                                                                                            )
                                                                                        )
                                                                                }}
                                                                                className="border-2 border-gray-300 text-blue-600 focus:border-blue-600"
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal text-gray-700">
                                                                            {goal}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="postingFrequency"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel className="text-lg font-semibold text-gray-700">How often would you like to post? 📅</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="daily" className="border-2 border-gray-300 text-blue-600 focus:border-blue-600" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal text-gray-700">
                                                                Daily <Smile className="inline-block w-5 h-5 text-yellow-500 ml-1" />
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="weekly" className="border-2 border-gray-300 text-blue-600 focus:border-blue-600" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal text-gray-700">
                                                                Weekly <Meh className="inline-block w-5 h-5 text-orange-500 ml-1" />
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="biweekly" className="border-2 border-gray-300 text-blue-600 focus:border-blue-600" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal text-gray-700">
                                                                Bi-weekly <Meh className="inline-block w-5 h-5 text-blue-500 ml-1" />
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="monthly" className="border-2 border-gray-300 text-blue-600 focus:border-blue-600" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal text-gray-700">
                                                                Monthly <Frown className="inline-block w-5 h-5 text-red-500 ml-1" />
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50 rounded-b-lg">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                        disabled={step === 1}
                        className="border-2 border-gray-300 text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {
                            if (step < totalSteps) {
                                setStep((prev) => prev + 1)
                            } else {
                                router.push("/dashboard/idea-generator") // Redirect to the specified link
                            }
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                        {step < totalSteps ? (
                            <>
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Finish <PartyPopper className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
