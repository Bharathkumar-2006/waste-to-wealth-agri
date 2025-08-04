import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Recycle, 
  TrendingUp, 
  Users, 
  MapPin, 
  Brain, 
  Smartphone, 
  Shield,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Identification",
      description: "Smart image recognition and ML algorithms identify waste types and suggest optimal reuse methods"
    },
    {
      icon: Recycle,
      title: "Waste-to-Resource Conversion",
      description: "Transform agricultural waste into valuable products through our innovative marketplace"
    },
    {
      icon: MapPin,
      title: "GPS-Based Pickup",
      description: "Convenient location-based waste collection with offline mobile app support"
    },
    {
      icon: Users,
      title: "FPO Partnerships",
      description: "Connect with Farmer Producer Organizations and Agricultural Cooperatives for bulk processing"
    }
  ];

  const benefits = [
    "Reduce environmental impact",
    "Generate additional income",
    "Access to modern technology",
    "Multi-language support",
    "Offline functionality",
    "Real-time market prices"
  ];

  const stats = [
    { number: "50K+", label: "Tons Recycled" },
    { number: "10K+", label: "Active Farmers" },
    { number: "500+", label: "Partner Industries" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="mb-4">
                  🌱 Sustainable Agriculture Technology
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  Transform Agricultural Waste into{" "}
                  <span className="gradient-primary bg-clip-text text-transparent">
                    Valuable Resources
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  AgriCycle connects farmers with industries through AI-powered waste management, 
                  creating sustainable solutions and additional income streams.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gradient-primary shadow-green text-lg px-8" asChild>
                  <Link to="/auth">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link to="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Secure & Trusted</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="gradient-card rounded-2xl p-8 shadow-glow">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Waste Identification</h3>
                    <Badge variant="secondary">AI Powered</Badge>
                  </div>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Leaf className="h-12 w-12 text-primary mx-auto" />
                      <p className="text-sm text-muted-foreground">Upload Image or Description</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rice Husk</span>
                      <span className="text-primary">₹8,500/ton</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Wheat Straw</span>
                      <span className="text-primary">₹6,200/ton</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Corn Stalks</span>
                      <span className="text-primary">₹5,800/ton</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Smart Features for Modern Farming
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with sustainable practices 
              to maximize the value of your agricultural waste.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="gradient-card shadow-green hover:shadow-glow transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Why Choose AgriCycle?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join thousands of farmers who are already benefiting from our sustainable 
                  waste management platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="gradient-primary shadow-green" asChild>
                <Link to="/benefits">
                  Explore All Benefits <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <Card className="gradient-card shadow-glow p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Mobile App</h3>
                    <Badge variant="secondary">
                      <Smartphone className="h-3 w-3 mr-1" />
                      Offline Ready
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">GPS Pickup Request</p>
                        <p className="text-xs text-muted-foreground">Location: Farm Block A</p>
                      </div>
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Market Prices</p>
                        <p className="text-xs text-muted-foreground">Real-time updates</p>
                      </div>
                      <Badge variant="outline" className="text-xs">Live</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="gradient-primary shadow-glow">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Transform Your Agricultural Waste?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join AgriCycle today and start converting your waste into valuable resources. 
                It's free to get started!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                  <Link to="/auth">Start Your Journey</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
