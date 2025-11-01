
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Rocket, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/errors";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

type FormValues = z.infer<typeof formSchema>;

export function AuthForm() {
  const [loading, setLoading] = useState(false);
  const [authAction, setAuthAction] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleAuthAction = async (data: FormValues) => {
    setLoading(true);
    try {
      if (authAction === "login") {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        toast({
            title: "Login realizado!",
            description: "Bem-vindo(a) de volta!",
        });
      } else {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        toast({
            title: "Conta criada com sucesso!",
            description: "Seja bem-vindo(a)!",
        });
      }
      router.push("/home");
      router.refresh(); // Garante que o estado de autenticação seja atualizado na página de destino
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: getFirebaseAuthErrorMessage(error.code),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      router.push("/home");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: getFirebaseAuthErrorMessage(error.code),
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const email = form.getValues("email");
    if (!email || !z.string().email().safeParse(email).success) {
      form.setError("email", { type: "manual", message: "Por favor, insira um e-mail válido para resetar a senha." });
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "E-mail enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: getFirebaseAuthErrorMessage(error.code),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center mb-2">
          <Rocket className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="text-2xl">O Fim da Procrastinação</CardTitle>
        <CardDescription>
          Acesse sua conta ou crie uma nova para começar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={authAction} 
          onValueChange={(value) => setAuthAction(value as "login" | "register")} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Criar Conta</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <TabsContent value="login" className="m-0">
                <form
                  onSubmit={form.handleSubmit(handleAuthAction)}
                  className="space-y-4 pt-4"
                >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="seu@email.com"
                              {...field}
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...field}
                                disabled={loading}
                                className="pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground"
                                disabled={loading}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button variant="link" type="button" onClick={handlePasswordReset} disabled={loading} className="p-0 h-auto text-sm text-primary">
                      Esqueceu a senha?
                    </Button>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Entrar
                    </Button>
                </form>
            </TabsContent>

            <TabsContent value="register" className="m-0">
                <form
                  onSubmit={form.handleSubmit(handleAuthAction)}
                  className="space-y-4 pt-4"
                >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="seu@email.com"
                              {...field}
                              disabled={loading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...field}
                                disabled={loading}
                                className="pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground"
                                disabled={loading}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Criar Conta
                    </Button>
                </form>
            </TabsContent>
          </Form>
        </Tabs>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Ou continue como
            </span>
          </div>
        </div>
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleAnonymousSignIn}
          disabled={loading}
        >
          {loading && authAction !== "login" && authAction !== "register" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Convidado
        </Button>
      </CardContent>
    </Card>
  );
}
