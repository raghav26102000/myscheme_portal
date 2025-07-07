import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: "Agriculture & Farmers",
      icon: "Wheat",
      count: 245,
      color: "bg-green-50 text-green-600",
      description: "Schemes for farmers, crop insurance, and agricultural development"
    },
    {
      id: 2,
      name: "Education & Scholarships",
      icon: "GraduationCap",
      count: 312,
      color: "bg-blue-50 text-blue-600",
      description: "Educational support, scholarships, and skill development"
    },
    {
      id: 3,
      name: "Healthcare & Wellness",
      icon: "Heart",
      count: 189,
      color: "bg-red-50 text-red-600",
      description: "Health insurance, medical schemes, and wellness programs"
    },
    {
      id: 4,
      name: "Women Empowerment",
      icon: "Users",
      count: 156,
      color: "bg-pink-50 text-pink-600",
      description: "Schemes supporting women's rights, safety, and empowerment"
    },
    {
      id: 5,
      name: "Business & Employment",
      icon: "Briefcase",
      count: 278,
      color: "bg-purple-50 text-purple-600",
      description: "Startup support, employment schemes, and business loans"
    },
    {
      id: 6,
      name: "Housing & Infrastructure",
      icon: "Home",
      count: 134,
      color: "bg-orange-50 text-orange-600",
      description: "Housing schemes, urban development, and infrastructure"
    },
    {
      id: 7,
      name: "Social Welfare",
      icon: "Shield",
      count: 223,
      color: "bg-teal-50 text-teal-600",
      description: "Social security, pension schemes, and welfare programs"
    },
    {
      id: 8,
      name: "Rural Development",
      icon: "TreePine",
      count: 167,
      color: "bg-emerald-50 text-emerald-600",
      description: "Rural infrastructure, employment, and development schemes"
    },
    {
      id: 9,
      name: "Senior Citizens",
      icon: "Users2",
      count: 98,
      color: "bg-amber-50 text-amber-600",
      description: "Pension, healthcare, and support schemes for elderly"
    },
    {
      id: 10,
      name: "Differently Abled",
      icon: "Accessibility",
      count: 87,
      color: "bg-indigo-50 text-indigo-600",
      description: "Support schemes for persons with disabilities"
    },
    {
      id: 11,
      name: "Youth & Sports",
      icon: "Trophy",
      count: 145,
      color: "bg-cyan-50 text-cyan-600",
      description: "Youth development, sports, and recreational schemes"
    },
    {
      id: 12,
      name: "Environment & Energy",
      icon: "Leaf",
      count: 112,
      color: "bg-lime-50 text-lime-600",
      description: "Environmental protection and renewable energy schemes"
    }
  ];

  const handleCategoryClick = (category) => {
    window.location.href = `/scheme-search-and-browse?category=${encodeURIComponent(category.name)}`;
  };

  return (
    <div className="bg-surface py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-4">
            Explore Schemes by Category
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Browse through different categories to find schemes that match your needs and eligibility
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              onClick={() => handleCategoryClick(category)}
              className="h-auto p-6 flex flex-col items-center space-y-4 bg-background hover:bg-surface border border-border hover:border-primary hover:shadow-md transition-all duration-200 rounded-xl group"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={category.icon} size={28} />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="font-heading font-semibold text-text-primary text-sm md:text-base leading-tight">
                  {category.name}
                </h3>
                
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-primary font-bold text-lg">
                    {category.count}
                  </span>
                  <span className="text-text-secondary text-sm">
                    schemes
                  </span>
                </div>
                
                <p className="text-text-secondary text-xs leading-relaxed hidden md:block">
                  {category.description}
                </p>
              </div>
              
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
              />
            </Button>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/scheme-search-and-browse'}
            iconName="Grid3x3"
            iconPosition="left"
            className="px-8 py-3"
          >
            View All Categories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;