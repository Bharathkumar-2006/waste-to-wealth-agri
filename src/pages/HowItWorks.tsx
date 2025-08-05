import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Leaf, Upload, Users, Package, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "1. List Your Waste",
      description: "Upload details about your agricultural waste including type, quantity, location, and quality.",
      details: ["Take photos of your waste", "Specify quantity and quality", "Set your location", "Add pricing expectations"]
    },
    {
      icon: Users,
      title: "2. Connect with Buyers",
      description: "Our platform matches you with verified buyers looking for your specific type of agricultural waste.",
      details: ["AI-powered matching", "Verified buyer profiles", "Direct communication", "Secure transactions"]
    },
    {
      icon: Package,
      title: "3. Negotiate & Arrange",
      description: "Negotiate prices, arrange logistics, and finalize deals through our secure platform.",
      details: ["Real-time chat", "Price negotiation", "Logistics support", "Payment protection"]
    },
    {
      icon: TrendingUp,
      title: "4. Track & Earn",
      description: "Monitor your sales, track environmental impact, and grow your sustainable income.",
      details: ["Sales dashboard", "Impact metrics", "Payment tracking", "Growth insights"]
    }
  ];

  const userJourneys = [
    {
      type: "Farmer",
      icon: Leaf,
      color: "bg-green-100 text-green-800",
      journey: [
        "Register as a farmer on AgriCycle",
        "Complete profile with farm details",
        "List agricultural waste with photos",
        "Receive buyer inquiries",
        "Negotiate and confirm deals",
        "Arrange pickup or delivery",
        "Receive payment and track impact"
      ]
    },
    {
      type: "FPO/Cooperative",
      icon: Users,
      color: "bg-blue-100 text-blue-800",
      journey: [
        "Register as FPO/Cooperative",
        "Add member farmers to platform",
        "Aggregate waste from members",
        "Create bulk listings",
        "Handle negotiations for members",
        "Coordinate logistics",
        "Distribute payments to farmers"
      ]
    },
    {
      type: "Industry Partner",
      icon: Package,
      color: "bg-purple-100 text-purple-800",
      journey: [
        "Register as industry partner",
        "Set waste requirements and specifications",
        "Browse available waste listings",
        "Connect with farmers/FPOs",
        "Negotiate terms and pricing",
        "Arrange transportation",
        "Process waste for production"
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Step by Step Guide
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How AgriCycle Works
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform your agricultural waste into value with our simple 4-step process. 
              Join thousands of farmers already earning from waste.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <Card key={index} className="gradient-card shadow-glow hover:shadow-green transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-green">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User Journeys */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Different Paths, Same Success
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether you're a farmer, FPO, or industry partner, we have a tailored journey for you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {userJourneys.map((journey, index) => (
                <Card key={index} className="gradient-card shadow-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="gradient-primary p-3 rounded-lg shadow-green">
                        <journey.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{journey.type}</CardTitle>
                        <Badge className={journey.color}>Verified</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {journey.journey.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                            {stepIndex + 1}
                          </div>
                          <p className="text-sm text-muted-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="gradient-card shadow-glow max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Start Your Journey?</CardTitle>
                <CardDescription className="text-lg">
                  Join AgriCycle today and transform your agricultural waste into sustainable income.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="gradient-primary shadow-green" size="lg" asChild>
                    <Link to="/auth">
                      Get Started Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;