"use client";
import React from "react";
import NewsFeed from "@/components/NewsFeed";
import DashboardStatsGrid from "../components/dashboard/DashboardStatsGrid";
import TransactionChart from "../components/dashboard/TransactionChart";
import BuyerProfilePieChart from "../components/dashboard/BuyerProfilePieChart";
import CitasRecientes from "../components/dashboard/CitasRecientes";

export default function Home() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentDay = currentDate.getDate();

  return (
    <section className="w-full">
      <div
        className="text-5xl font-bold text-black-500 px-4 text-center mb-6"
        style={{ color: "#28539E" }}
      >
        Indicadores - {currentMonth} {currentDay}, 2023
      </div>

      <div className="flex flex-col gap-4">
        <DashboardStatsGrid />
        <div className="flex flex-row gap-4 w-full">
          <TransactionChart />
          <BuyerProfilePieChart />
        </div>

        <div className="flex flex-row gap-4 w-full">
          <CitasRecientes />
          <NewsFeed />
        </div>
      </div>
    </section>
  );
}
