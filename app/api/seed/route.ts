import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const cars = [
    { name: "Toyota Fortuner", id: "toyota-fortuner", imageUrl: "/cars/fortuner.jpg" },
    { name: "Honda City", id: "honda-city", imageUrl: "/cars/city.jpg" },
  ];

  try {
    for (const car of cars) {
      await prisma.car.upsert({
        where: { id: car.id },
        update: {},
        create: car,
      });
    }
    return NextResponse.json({ message: "Seed successful" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
