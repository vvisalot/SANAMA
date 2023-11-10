//Pagina de inicio al cargar por primera vez la aplicacion
//TODO: Un componente Dashboard que muestre datos iniciales.
"use client";
import React from "react";
import NewsFeed from "@/components/NewsFeed";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-10">
      <div className="font-bold text-blue-500">Noticias Medicas</div>
      <NewsFeed />
    </main>
  );
}
