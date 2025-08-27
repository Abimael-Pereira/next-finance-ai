import { LogInIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "../_components/ui/button";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
        <h1 className="mt-8 text-4xl font-bold">Bem-vindo</h1>
        <p className="text-muted-foreground mt-3">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <Button className="mt-8" variant="outline">
          <LogInIcon className="mr-2" /> Fazer login ou criar conta
        </Button>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
