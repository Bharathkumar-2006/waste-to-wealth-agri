import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, ArrowLeft, Globe, Users, Truck } from "lucide-react";
import Layout from "@/components/Layout";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("farmer");
  const [language, setLanguage] = useState("en");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "te", name: "తెలుగు" },
    { code: "ta", name: "தமிழ்" },
    { code: "bn", name: "বাংলা" },
  ];

  const userTypes = [
    {
      value: "farmer",
      label: "Farmer",
      icon: Leaf,
      description: "Individual farmers and small agricultural holdings"
    },
    {
      value: "fpo",
      label: "FPO/Cooperative",
      icon: Users,
      description: "Farmer Producer Organizations and Agricultural Cooperatives"
    },
    {
      value: "industry",
      label: "Industry Partner",
      icon: Truck,
      description: "Companies looking to source agricultural waste"
    }
  ];

  const handleAuth = async (isSignUp: boolean) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <Layout>
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <Button variant="ghost" className="p-0" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="gradient-primary p-3 rounded-lg shadow-green">
                  <Leaf className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Welcome to AgriCycle
              </h1>
              <p className="text-muted-foreground">
                Join thousands of farmers transforming waste into wealth
              </p>
            </div>

            {/* Language Selector */}
            <div className="mb-6">
              <Label htmlFor="language" className="text-sm font-medium mb-2 block">
                <Globe className="h-4 w-4 inline mr-2" />
                Select Language / भाषा चुनें
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Auth Tabs */}
            <Card className="gradient-card shadow-glow">
              <Tabs defaultValue="signin" className="w-full">
                <CardHeader className="space-y-1 pb-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="space-y-4">
                  <TabsContent value="signin" className="space-y-4">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">Welcome back!</CardTitle>
                      <CardDescription>
                        Sign in to your AgriCycle account
                      </CardDescription>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <Button 
                        className="w-full gradient-primary shadow-green" 
                        onClick={() => handleAuth(false)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">Create your account</CardTitle>
                      <CardDescription>
                        Join AgriCycle and start transforming your waste
                      </CardDescription>
                    </div>

                    <div className="space-y-4">
                      {/* User Type Selection */}
                      <div className="space-y-3">
                        <Label>I am a:</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {userTypes.map((type) => (
                            <div
                              key={type.value}
                              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                userType === type.value
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => setUserType(type.value)}
                            >
                              <div className="flex items-start space-x-3">
                                <type.icon className="h-5 w-5 text-primary mt-0.5" />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">{type.label}</span>
                                    {userType === type.value && (
                                      <Badge variant="secondary" className="text-xs">
                                        Selected
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {type.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input
                            id="first-name"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input
                            id="last-name"
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="Village, District, State"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          required
                        />
                      </div>

                      <Button 
                        className="w-full gradient-primary shadow-green" 
                        onClick={() => handleAuth(true)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating account..." : "Create Account"}
                      </Button>
                    </div>
                  </TabsContent>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground text-center">
                      By continuing, you agree to our{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Tabs>
            </Card>

            {/* Help Section */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Need help getting started?
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;