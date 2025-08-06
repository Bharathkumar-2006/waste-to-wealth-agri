import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MapPin, 
  Star, 
  Filter,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  Calendar,
  Phone,
  Mail
} from "lucide-react";
import Layout from "@/components/Layout";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const listings = [
    {
      id: 1,
      title: "Premium Rice Husk - 500 Tons",
      category: "Rice Husk",
      price: "₹8,500/ton",
      location: "Punjab, India",
      seller: "Green Valley FPO",
      rating: 4.8,
      quantity: "500 tons",
      quality: "Grade A",
      posted: "2 days ago",
      image: "/placeholder.svg",
      description: "High-quality rice husk suitable for biomass energy production and construction materials."
    },
    {
      id: 2,
      title: "Wheat Straw Bales - 300 Tons",
      category: "Wheat Straw",
      price: "₹6,200/ton",
      location: "Haryana, India",
      seller: "Sunrise Cooperative",
      rating: 4.6,
      quantity: "300 tons",
      quality: "Grade A",
      posted: "1 day ago",
      image: "/placeholder.svg",
      description: "Fresh wheat straw bales, perfect for paper manufacturing and animal bedding."
    },
    {
      id: 3,
      title: "Corn Stalks - 200 Tons",
      category: "Corn Stalks",
      price: "₹5,800/ton",
      location: "Uttar Pradesh, India",
      seller: "AgriWaste Solutions",
      rating: 4.9,
      quantity: "200 tons",
      quality: "Premium",
      posted: "3 days ago",
      image: "/placeholder.svg",
      description: "Processed corn stalks ideal for biofuel production and organic fertilizer."
    },
    {
      id: 4,
      title: "Sugarcane Bagasse - 150 Tons",
      category: "Bagasse",
      price: "₹4,500/ton",
      location: "Maharashtra, India",
      seller: "Sweet Harvest FPO",
      rating: 4.7,
      quantity: "150 tons",
      quality: "Grade B+",
      posted: "1 week ago",
      image: "/placeholder.svg",
      description: "Dry sugarcane bagasse suitable for paper pulp and building materials."
    }
  ];

  const buyers = [
    {
      id: 1,
      name: "EcoPaper Industries",
      type: "Paper Manufacturing",
      location: "Gujarat, India",
      rating: 4.9,
      requirements: "Rice Husk, Wheat Straw",
      volume: "1000+ tons/month",
      contact: "+91 98765 43210"
    },
    {
      id: 2,
      name: "GreenEnergy Solutions",
      type: "Biomass Energy",
      location: "Tamil Nadu, India",
      rating: 4.8,
      requirements: "All types of agricultural waste",
      volume: "2000+ tons/month",
      contact: "+91 87654 32109"
    },
    {
      id: 3,
      name: "BioBuild Materials",
      type: "Construction Materials",
      location: "Karnataka, India",
      rating: 4.6,
      requirements: "Rice Husk, Corn Stalks",
      volume: "500+ tons/month",
      contact: "+91 76543 21098"
    }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || listing.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              AgriCycle Marketplace
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect farmers with industries to buy and sell agricultural waste
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="text-center p-4">
              <CardContent className="p-0">
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">1,250</div>
                <div className="text-sm text-muted-foreground">Active Listings</div>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="p-0">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">350</div>
                <div className="text-sm text-muted-foreground">Verified Buyers</div>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="p-0">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">₹12.5L</div>
                <div className="text-sm text-muted-foreground">Transactions This Month</div>
              </CardContent>
            </Card>
            <Card className="text-center p-4">
              <CardContent className="p-0">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">₹7,200</div>
                <div className="text-sm text-muted-foreground">Average Price/Ton</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="listings">Waste Listings</TabsTrigger>
              <TabsTrigger value="buyers">Find Buyers</TabsTrigger>
              <TabsTrigger value="post">Post Listing</TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="space-y-6">
              {/* Filters */}
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search waste types..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Rice Husk">Rice Husk</SelectItem>
                      <SelectItem value="Wheat Straw">Wheat Straw</SelectItem>
                      <SelectItem value="Corn Stalks">Corn Stalks</SelectItem>
                      <SelectItem value="Bagasse">Bagasse</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Punjab">Punjab</SelectItem>
                      <SelectItem value="Haryana">Haryana</SelectItem>
                      <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </Card>

              {/* Listings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-primary">
                        {listing.quality}
                      </Badge>
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{listing.title}</CardTitle>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{listing.price}</div>
                          <div className="text-sm text-muted-foreground">{listing.quantity}</div>
                        </div>
                      </div>
                      <CardDescription className="text-sm">
                        {listing.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          {listing.location}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                          {listing.rating}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">By: {listing.seller}</span>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {listing.posted}
                        </div>
                      </div>
                      <Button className="w-full">Contact Seller</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="buyers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buyers.map((buyer) => (
                  <Card key={buyer.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {buyer.name}
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                          {buyer.rating}
                        </div>
                      </CardTitle>
                      <CardDescription>{buyer.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {buyer.location}
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1">Requirements:</div>
                        <Badge variant="outline" className="text-xs">
                          {buyer.requirements}
                        </Badge>
                      </div>
                      <div>
                        <div className="font-semibold text-sm mb-1">Volume:</div>
                        <span className="text-sm text-muted-foreground">{buyer.volume}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        {buyer.contact}
                      </div>
                      <Button className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Buyer
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="post" className="space-y-6">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Post New Listing</CardTitle>
                  <CardDescription>
                    Create a new listing to sell your agricultural waste
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Waste Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select waste type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rice-husk">Rice Husk</SelectItem>
                          <SelectItem value="wheat-straw">Wheat Straw</SelectItem>
                          <SelectItem value="corn-stalks">Corn Stalks</SelectItem>
                          <SelectItem value="bagasse">Bagasse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Quantity (tons)</label>
                      <Input placeholder="Enter quantity" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Price per Ton (₹)</label>
                      <Input placeholder="Enter price" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Quality Grade</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="grade-a">Grade A</SelectItem>
                          <SelectItem value="grade-b">Grade B+</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input placeholder="Enter location (City, State)" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <textarea
                      className="w-full p-3 border rounded-md resize-none"
                      rows={4}
                      placeholder="Describe your waste and any special characteristics..."
                    />
                  </div>
                  <Button className="w-full">
                    Post Listing
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;