import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Gift, Link as LinkIcon, Lock } from "lucide-react";

const bonusItems = [
  { title: "Planilhas Bônus", icon: Download, status: "Em breve" },
  { title: "Comunidade VIP", icon: Lock, status: "Em breve" },
  { title: "Módulo Extra", icon: Gift, status: "Em breve" },
  { title: "Links Úteis", icon: LinkIcon, status: "Em breve" },
];

export default function MorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline tracking-tight">
        Mais Conteúdos
      </h1>
      <p className="text-muted-foreground mt-2 mb-8">
        Recursos extras para acelerar seus resultados.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bonusItems.map((item, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <p className="text-sm font-semibold text-accent">{item.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
