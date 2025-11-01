import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const bonusContent = [
    {id: 1, title: "Planner de Produtividade", description: "Organize sua semana.", type: "PDF"},
    {id: 2, title: "Guia de Ferramentas", description: "Apps para manter o foco.", type: "PDF"},
    {id: 3, title: "Comunidade Exclusiva", description: "Conecte-se com outros membros.", type: "Link"},
    {id: 4, title: "Checklist Anti-Procrastinação", description: "Passos para começar agora.", type: "PDF"},
]

export default function MorePage() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Mais Conteúdos
        </h1>
        <p className="text-muted-foreground mt-2">
          Materiais bônus para acelerar seus resultados.
        </p>
      </header>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bonusContent.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    {item.type === 'PDF' ? 'Baixar' : 'Acessar'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
}
