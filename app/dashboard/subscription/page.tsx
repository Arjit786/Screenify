"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, ChevronLeft, Zap } from "lucide-react"
import { Sidebar } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const plans = [
    {
        name: "Starter",
        priceMonthly: 15,
        priceYearly: 150,
        features: [
            "Unlimited ideas with basic filters",
            "Basic templates and limited AI suggestions",
            "Limited AI-Content-Optimize uses per month",
            "Schedule up to 20 posts per month",
            "Create up to 5 carousels per month",
        ],
        ideal: "Solo creators, freelancers, small business owners",
    },
    {
        name: "Professional",
        priceMonthly: 40,
        priceYearly: 400,
        features: [
            "Advanced idea filters and team collaboration",
            "Premium templates and AI-driven suggestions",
            "Unlimited AI-Content-Optimize with advanced options",
            "Schedule up to 100 posts per month",
            "Create up to 20 carousels per month",
            "Basic engagement automation features",
        ],
        popular: true,
        ideal: "Small businesses, growing agencies, professional content creators",
    },
    {
        name: "Enterprise",
        priceMonthly: 80,
        priceYearly: 800,
        features: [
            "Unlimited ideas with team collaboration tools",
            "Exclusive AI-driven inspiration resources",
            "Unlimited AI-Content-Optimize with A/B testing",
            "Unlimited post scheduling with team access",
            "Unlimited carousels with premium customization",
            "Full engagement automation suite",
            "Dedicated account manager and priority support",
        ],
        ideal: "Large teams, agencies, enterprises managing multiple accounts",
    },
]

export default function SubscriptionPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

    const toggleBillingCycle = () => {
        setBillingCycle((prev) => (prev === "monthly" ? "yearly" : "monthly"))
    }

    return (
        <div className="flex h-screen bg-blue-50">
            <Sidebar />

            <main className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mr-4">
                                <ChevronLeft className="h-6 w-6" />
                            </Link>
                            <h1 className="text-3xl font-bold text-blue-900">Choose Your Plan</h1>
                        </div>
                        <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-sm">
                            <Label htmlFor="billing-toggle" className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${billingCycle === "monthly" ? "bg-blue-100 text-blue-700" : "text-blue-600"}`}>Monthly</Label>
                            <Switch
                                id="billing-toggle"
                                checked={billingCycle === "yearly"}
                                onCheckedChange={toggleBillingCycle}
                            />
                            <Label htmlFor="billing-toggle" className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${billingCycle === "yearly" ? "bg-blue-100 text-blue-700" : "text-blue-600"}`}>Yearly</Label>
                        </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {plans.map((plan) => (
                            <Card key={plan.name} className={`flex flex-col bg-white border-2 ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-blue-200'} transition-all hover:shadow-lg`}>
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <CardTitle className="text-2xl font-bold text-blue-900">{plan.name}</CardTitle>
                                        {plan.popular && <Badge variant="secondary" className="bg-blue-100 text-blue-700">Most Popular</Badge>}
                                    </div>
                                    <CardDescription className="text-3xl font-bold text-blue-700">
                                        ${billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly}
                                        <span className="text-base font-normal text-blue-600">/{billingCycle === "monthly" ? "month" : "year"}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="mb-4 font-medium text-blue-700">Ideal for: {plan.ideal}</p>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <Check className="mr-2 h-5 w-5 mt-0.5 text-blue-500" />
                                                <span className="text-blue-800">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className={`w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors`}>
                                        {plan.popular ? (
                                            <>
                                                <Zap className="mr-2 h-4 w-4" />
                                                Get Started
                                            </>
                                        ) : (
                                            'Choose Plan'
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">Feature Comparison</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/3">Feature</TableHead>
                                    {plans.map((plan) => (
                                        <TableHead key={plan.name} className="text-center">{plan.name}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">AI-Content-Optimize</TableCell>
                                    <TableCell className="text-center">Limited</TableCell>
                                    <TableCell className="text-center">Unlimited</TableCell>
                                    <TableCell className="text-center">Unlimited with A/B testing</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Post Scheduling</TableCell>
                                    <TableCell className="text-center">Up to 20/month</TableCell>
                                    <TableCell className="text-center">Up to 100/month</TableCell>
                                    <TableCell className="text-center">Unlimited</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Carousel Creation</TableCell>
                                    <TableCell className="text-center">Up to 5/month</TableCell>
                                    <TableCell className="text-center">Up to 20/month</TableCell>
                                    <TableCell className="text-center">Unlimited</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Team Collaboration</TableCell>
                                    <TableCell className="text-center">-</TableCell>
                                    <TableCell className="text-center">Basic</TableCell>
                                    <TableCell className="text-center">Advanced</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Engagement Automation</TableCell>
                                    <TableCell className="text-center">-</TableCell>
                                    <TableCell className="text-center">Basic</TableCell>
                                    <TableCell className="text-center">Full Suite</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <p className="text-center text-blue-600">
                        All plans come with a 14-day free trial. No credit card required.
                    </p>
                </div>
            </main>
        </div>
    )
}