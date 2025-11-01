import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const bonusContent = [
    {id: 1, title: "Planner de Produtividade", description: "Organize sua semana.", type: "PDF", href: "https://www.notion.so/Planner-Semanal-de-Produtividade-cf66434848624e80a844c2974e8d8114?source=copy_link"},
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
                <Button asChild className="w-full">
                  <a 
                    href={(item as any).href || '#'}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={!(item as any).href ? 'pointer-events-none opacity-50' : ''}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {item.type === 'PDF' ? 'Baixar' : 'Acessar'}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
}
