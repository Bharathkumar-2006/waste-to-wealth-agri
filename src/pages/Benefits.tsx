import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  Leaf, 
  TrendingUp, 
  Users, 
  Globe, 
  DollarSign, 
  Recycle, 
  Shield,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Heart
} from "lucide-react";
import Layout from "@/components/Layout";

const Benefits = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Additional Income",
      description: "Generate 15-30% additional income by selling agricultural waste that was previously burned or discarded.",
      stats: "₹50,000+ average annual earnings",
      color: "text-green-600"
    },
    {
      icon: Recycle,
      title: "Environmental Impact",
      description: "Reduce carbon emissions by 40% and contribute to a circular economy by recycling agricultural waste.",
      stats: "2.5 tons CO₂ saved per farmer annually",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Connect with fellow farmers, share knowledge, and build a sustainable agricultural community.",
      stats: "10,000+ farmers already connected",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "All transactions are protected with escrow services and verified buyer-seller networks.",
      stats: "99.8% successful transaction rate",
      color: "text-orange-600"
    }
  ];

  const impactMetrics = [
    { label: "Waste Diverted from Burning", value: 85, unit: "%" },
    { label: "Farmer Income Increase", value: 25, unit: "%" },
    { label: "Carbon Emissions Reduced", value: 40, unit: "%" },
    { label: "Buyer Satisfaction Rate", value: 96, unit: "%" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Rice Farmer, Punjab",
      content: "I used to burn my rice stubble every year. Now I earn ₹12,000 annually by selling it through AgriCycle.",
      savings: "₹12,000 annually"
    },
    {
      name: "Sunita Cooperative",
      role: "FPO, Maharashtra",
      content: "Our 200 member farmers collectively earn ₹8 lakhs annually from sugarcane bagasse sales.",
      savings: "₹8 lakhs annually"
    },
    {
      name: "GreenTech Industries",
      role: "Industry Partner",
      content: "AgriCycle provides us with consistent, quality agricultural waste for our bio-fuel production.",
      savings: "40% cost reduction"
    }
  ];

  const environmentalBenefits = [
    {
      icon: Globe,
      title: "Climate Action",
      description: "Reduce greenhouse gas emissions from agricultural burning",
      impact: "2.5M tons CO₂ prevented annually"
    },
    {
      icon: Leaf,
      title: "Soil Health",
      description: "Prevent soil degradation from harmful burning practices",
      impact: "50,000+ hectares protected"
    },
    {
      icon: Heart,
      title: "Air Quality",
      description: "Improve air quality in rural and urban areas",
      impact: "85% reduction in particulate matter"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Why Choose AgriCycle
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Benefits for Everyone
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover how AgriCycle creates value for farmers, businesses, and the environment 
              through sustainable agricultural waste management.
            </p>
          </div>

          {/* Main Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="gradient-card shadow-glow hover:shadow-green transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="gradient-primary p-3 rounded-lg shadow-green">
                      <benefit.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      <Badge variant="outline" className={benefit.color}>
                        {benefit.stats}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Impact Metrics */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Our Impact in Numbers
              </h2>
              <p className="text-lg text-muted-foreground">
                Real results from our platform across India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactMetrics.map((metric, index) => (
                <Card key={index} className="gradient-card shadow-glow text-center">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">
                      {metric.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-3xl font-bold text-primary">
                        {metric.value}{metric.unit}
                      </div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Environmental Benefits */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Environmental Benefits
              </h2>
              <p className="text-lg text-muted-foreground">
                Making a positive impact on our planet, one farm at a time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {environmentalBenefits.map((benefit, index) => (
                <Card key={index} className="gradient-card shadow-glow text-center">
                  <CardHeader>
                    <div className="gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-green">
                      <benefit.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {benefit.description}
                    </CardDescription>
                    <Badge variant="secondary" className="text-primary">
                      {benefit.impact}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Success Stories
              </h2>
              <p className="text-lg text-muted-foreground">
                Hear from our community members about their experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="gradient-card shadow-glow">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="gradient-primary p-2 rounded-full shadow-green">
                        <CheckCircle className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <Badge className="bg-green-100 text-green-800">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {testimonial.savings}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="gradient-card shadow-glow max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Start Benefiting Today</CardTitle>
                <CardDescription className="text-lg">
                  Join thousands of farmers already earning from their agricultural waste.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="gradient-primary shadow-green" size="lg" asChild>
                    <Link to="/auth">
                      Start Earning Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/how-it-works">Learn How It Works</Link>
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

export default Benefits;