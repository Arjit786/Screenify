"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Check, ChevronLeft } from "lucide-react"
import { Sidebar } from "@/components/ui/sidebar"
const plans = [
    {
        name: "Basic",
        priceUSD: 19,
        priceINR: 1499,
        features: ["100 AI-generated posts", "Basic analytics", "5 social accounts"],
    },
    {
        name: "Pro",
        priceUSD: 29,
        priceINR: 2299,
        features: ["Unlimited AI-generated posts", "Advanced analytics", "10 social accounts", "Priority support"],
    },
    {
        name: "Enterprise",
        priceUSD: 39,
        priceINR: 3099,
        features: ["Everything in Pro", "Custom AI model training", "Unlimited social accounts", "Dedicated account manager"],
    },
]

export default function SubscriptionPage() {
    const [currency, setCurrency] = useState<"USD" | "INR">("USD")

    const toggleCurrency = () => {
        setCurrency((prevCurrency) => (prevCurrency === "USD" ? "INR" : "USD"))
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center mb-6">
                        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mr-2">
                            <ChevronLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-3xl font-bold">Upgrade Your Account</h1>
                    </div>
                    <div className="flex justify-end items-center mb-8">
                        <Label htmlFor="currency-toggle" className={`mr-2 ${currency === "USD" ? "font-bold" : ""}`}>USD</Label>
                        <Switch
                            id="currency-toggle"
                            checked={currency === "INR"}
                            onCheckedChange={toggleCurrency}
                        />
                        <Label htmlFor="currency-toggle" className={`ml-2 ${currency === "INR" ? "font-bold" : ""}`}>INR</Label>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {plans.map((plan) => (
                            <Card key={plan.name} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-blue-600">{plan.name}</CardTitle>
                                    <CardDescription className="text-2xl font-bold">
                                        {currency === "USD" ? `$${plan.priceUSD}/month` : `₹${plan.priceINR}/month`}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <Check className="mr-2 h-4 w-4 text-blue-500" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Choose Plan</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}