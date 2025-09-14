import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PricingTier } from '@/types';

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    period: 'month',
    charactersPerMonth: 5000,
    voiceOptions: 10,
    priority: false,
    features: [
      '5,000 characters per month',
      '10 professional voices',
      'MP3 & WAV downloads',
      'Session history',
      'Mobile responsive',
      'No signup required'
    ]
  },
  {
    name: 'Pro',
    price: 19,
    period: 'month',
    charactersPerMonth: 100000,
    voiceOptions: 25,
    priority: true,
    popular: true,
    features: [
      '100,000 characters per month',
      '25+ premium voices',
      'Priority processing',
      'Advanced voice controls',
      'Batch processing',
      'API access',
      'Commercial license',
      'Email support'
    ]
  },
  {
    name: 'Enterprise',
    price: 99,
    period: 'month',
    charactersPerMonth: 500000,
    voiceOptions: 50,
    priority: true,
    features: [
      '500,000 characters per month',
      '50+ premium voices',
      'Custom voice training',
      'Dedicated support',
      'White-label solution',
      'Advanced analytics',
      'Team collaboration',
      'SLA guarantee'
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your voice generation needs. Start free, upgrade when you're ready.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <Card 
            key={tier.name} 
            className={`relative ${tier.popular ? 'border-primary shadow-lg scale-105' : ''}`}
          >
            {tier.popular && (
              <Badge 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground"
              >
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
              <div className="space-y-2">
                <div className="text-4xl font-bold">
                  ${tier.price}
                  <span className="text-lg font-normal text-muted-foreground">
                    /{tier.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tier.charactersPerMonth.toLocaleString()} characters/month
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg 
                      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button 
                  className={`w-full ${
                    tier.name === 'Free' 
                      ? 'variant-outline' 
                      : tier.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'variant-outline'
                  }`}
                  size="lg"
                >
                  {tier.name === 'Free' ? 'Get Started Free' : 'Choose Plan'}
                </Button>
              </div>

              {tier.priority && (
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span>Priority Processing</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="space-y-6 mt-16">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Compare Features</h2>
          <p className="text-muted-foreground">
            Detailed breakdown of what's included in each plan
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Free</th>
                    <th className="text-center p-4 font-semibold bg-primary/5">Pro</th>
                    <th className="text-center p-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Monthly Characters</td>
                    <td className="text-center p-4">5,000</td>
                    <td className="text-center p-4 bg-primary/5">100,000</td>
                    <td className="text-center p-4">500,000</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Voice Options</td>
                    <td className="text-center p-4">10</td>
                    <td className="text-center p-4 bg-primary/5">25+</td>
                    <td className="text-center p-4">50+</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Audio Formats</td>
                    <td className="text-center p-4">MP3, WAV</td>
                    <td className="text-center p-4 bg-primary/5">MP3, WAV</td>
                    <td className="text-center p-4">MP3, WAV</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Commercial License</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4 bg-primary/5">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">API Access</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4 bg-primary/5">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Priority Processing</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4 bg-primary/5">✅</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">Custom Voice Training</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4 bg-primary/5">❌</td>
                    <td className="text-center p-4">✅</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-4 font-medium">Support Level</td>
                    <td className="text-center p-4">Community</td>
                    <td className="text-center p-4 bg-primary/5">Email</td>
                    <td className="text-center p-4">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6 mt-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens if I exceed my limit?</h3>
              <p className="text-sm text-muted-foreground">
                You'll be notified when approaching your limit. Free users can upgrade, paid users can purchase additional characters.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee for all paid plans.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
              <p className="text-sm text-muted-foreground">
                No setup fees or hidden costs. Pay only for what you use.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I use generated voices commercially?</h3>
              <p className="text-sm text-muted-foreground">
                Commercial usage requires a Pro or Enterprise plan with proper licensing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer team plans?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, Enterprise plans include team collaboration features with multiple user accounts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-primary/5 rounded-lg p-8 space-y-4">
        <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground">
          Start with our free plan and upgrade when you need more features.
        </p>
        <div className="pt-4">
          <Button size="lg" asChild>
            <a href="/">Try AI Voice Studio Free</a>
          </Button>
        </div>
      </div>
    </div>
  );
}