import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Users, Award, Target, Heart, Globe } from "lucide-react";
import Layout from "@/components/Layout";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Sustainability First",
      description: "Every decision we make prioritizes environmental sustainability and long-term ecological health."
    },
    {
      icon: Users,
      title: "Farmer-Centric",
      description: "We put farmers at the center of everything we do, ensuring their success is our success."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Building solutions that scale globally while respecting local agricultural practices."
    },
    {
      icon: Award,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to solve age-old agricultural waste challenges."
    }
  ];

  const team = [
    {
      name: "Dr. Mahalakshmi ",
      role: "CEO & Co-Founder",
      description: "Agricultural scientist with 15 years of experience in sustainable farming practices."
    },
    {
      name: "Vidhuran C",
      role: "CTO & Co-Founder",
      description: "AI/ML expert specializing in computer vision and agricultural technology solutions."
    },
    {
      name: "Nethra S",
      role: "Head of Operations",
      description: "Former FPO coordinator with deep understanding of rural agricultural networks."
    },
    {
      name: "Dr. Bharathkumar",
      role: "Head of Research",
      description: "Researcher in agricultural waste management and circular economy principles."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Leaf className="h-4 w-4 mr-2" />
              About AgriCycle
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Transforming Agriculture Through{" "}
              <span className="gradient-primary bg-clip-text text-transparent">
                Smart Innovation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Founded in 2025, AgriCycle is on a mission to revolutionize agricultural waste management 
              through technology, creating sustainable solutions that benefit farmers, industries, and the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="gradient-card shadow-green">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">
                  <Target className="h-8 w-8 text-primary mb-4" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  To empower farmers with smart technology that transforms agricultural waste into valuable resources, 
                  creating sustainable income streams while protecting our environment for future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card shadow-green">
              <CardHeader>
                <CardTitle className="text-2xl mb-2">
                  <Globe className="h-8 w-8 text-primary mb-4" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  A world where agricultural waste is no longer seen as a burden but as a valuable resource, 
                  contributing to a circular economy that benefits farmers, industries, and the planet.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide every aspect of our work and shape how we build relationships 
              with farmers, partners, and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="gradient-card shadow-green hover:shadow-glow transition-all duration-300 text-center">
                <CardHeader>
                  <div className="gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  AgriCycle was born from a simple observation: millions of tons of agricultural waste 
                  are burned every year, causing pollution while representing untapped economic potential.
                </p>
                <p>
                  Our founders, coming from backgrounds in agricultural science and technology, recognized 
                  that the solution lay in connecting farmers with industries that could utilize this waste, 
                  while providing the tools and knowledge to make these connections seamless.
                </p>
                <p>
                  Today, we're proud to serve thousands of farmers across India, helping them transform 
                  what was once considered waste into valuable income sources, all while contributing 
                  to a more sustainable future.
                </p>
              </div>
            </div>

            <Card className="gradient-card shadow-glow p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">2025</div>
                  <p className="text-muted-foreground">Founded</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <p className="text-sm text-muted-foreground">Tons Processed</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">10K+</div>
                    <p className="text-sm text-muted-foreground">Farmers Served</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <p className="text-sm text-muted-foreground">Industry Partners</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">15</div>
                    <p className="text-sm text-muted-foreground">States Covered</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team brings together expertise in agriculture, technology, and sustainability 
              to drive meaningful change in rural communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="gradient-card shadow-green hover:shadow-glow transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Join Our Mission
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be part of the agricultural transformation. Together, we can create a more sustainable 
              and prosperous future for farming communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Card className="gradient-primary shadow-glow p-6 max-w-sm">
                <div className="text-center text-primary-foreground">
                  <h3 className="text-xl font-semibold mb-2">For Farmers</h3>
                  <p className="mb-4">Start converting your waste into income today</p>
                  <button className="bg-primary-foreground text-primary px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                    Get Started
                  </button>
                </div>
              </Card>
              
              <Card className="gradient-card shadow-green p-6 max-w-sm">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">For Partners</h3>
                  <p className="text-muted-foreground mb-4">Join our network of sustainable industries</p>
                  <button className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Partner With Us
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;