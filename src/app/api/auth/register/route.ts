import { NextResponse } from "next/server";
import { prisma } from "@/server/db/prisma";
import { RegisterSchema } from "@/schemas/auth.schema";
import { createSampleResume } from "@/schemas/resume.schema";
import bcrypt from "bcryptjs";
import { applyRateLimit } from "@/server/middleware/rate-limit";

export async function POST(req: Request) {
  try {
    const rateLimit = applyRateLimit(req, "auth");
    if (rateLimit.response) return rateLimit.response;

    const json = await req.json();
    const parsed = RegisterSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email address already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        hashedPassword,
        subscription: {
          create: {
            plan: "FREE",
            status: "ACTIVE",
          },
        },
      },
    });

    // Create a default starter resume with realistic sample data
    const sampleResume = createSampleResume();
    sampleResume.basics.name = name;
    sampleResume.basics.email = email;

    const defaultDesign = {
      paperSize: "A4",
      fontFamily: "Inter",
      fontSize: "medium",
      lineHeight: "normal",
      pageMargins: "normal",
      sectionSpacing: "normal",
      primaryColor: "#2563EB",
      textColor: "#1E293B",
      backgroundColor: "#FFFFFF",
      photo: { visible: true, shape: "circle", size: "medium", border: false },
      showWatermark: true,
    };

    await prisma.resume.create({
      data: {
        userId: user.id,
        title: "My First Resume",
        templateId: "modern-minimal",
        content: JSON.stringify(sampleResume),
        design: JSON.stringify(defaultDesign),
        hasWatermark: true,
        atsScore: 88,
      },
    });

    return NextResponse.json(
      { message: "Account created successfully", user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}

