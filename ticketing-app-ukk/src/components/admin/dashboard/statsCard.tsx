import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


const StatsCard = ({ title, description, value }:{
    title: string;
    description: string;
    value: string;
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="space-y-1">
      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold text-primary">{value}</p>
    </CardContent>
  </Card>
);

export default StatsCard;
