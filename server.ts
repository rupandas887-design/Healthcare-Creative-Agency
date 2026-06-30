import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// In-Memory Database for Submissions
const submissions: any[] = [];

// Lazy-initialization of Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } else {
      console.warn("GEMINI_API_KEY is not configured or uses the placeholder. Fallback mock reports will be used.");
    }
  }
  return aiClient;
}

// REST Endpoint: Submit booking discussion and generate custom Surgical growth audit
app.post("/api/discussion", async (req, res) => {
  const {
    name,
    hospitalName,
    specialty,
    city,
    mobileNumber,
    email,
    currentMonthlyProcedures,
    biggestGrowthChallenge,
  } = req.body;

  // Validate fields
  if (!name || !hospitalName || !specialty || !email) {
    return res.status(400).json({ error: "Required fields are missing: Name, Hospital Name, Surgical Specialty, and Email." });
  }

  const submission = {
    id: `ss_${Date.now()}`,
    name,
    hospitalName,
    specialty,
    city: city || "Not provided",
    mobileNumber: mobileNumber || "Not provided",
    email,
    currentMonthlyProcedures: currentMonthlyProcedures || "0",
    biggestGrowthChallenge: biggestGrowthChallenge || "Not specified",
    submittedAt: new Date().toISOString(),
  };

  submissions.unshift(submission);
  console.log("New Strategic Discussion submitted:", submission);

  const currentProceduresNumeric = parseInt(currentMonthlyProcedures, 10) || 12;

  try {
    const ai = getGemini();

    if (ai) {
      // Prompt construction using Sunil's framework
      const prompt = `
        You are Sunil Sulegai, a Strategic Healthcare Growth Specialist for Surgeon-Owned Hospitals (NOT a generic marketing agency).
        
        Analyze the following intake details from a hospital founder/surgeon-owner who just completed your growth discovery questionnaire:
        - Hospital Name: "${submission.hospitalName}"
        - Surgical Specialty: "${submission.specialty}"
        - Geographic City/Market: "${submission.city}"
        - Current Monthly Volume: ${submission.currentMonthlyProcedures} procedures/month (equals approx ${currentProceduresNumeric * 12} annual surgeries)
        - Selected/Described Core Growth Challenge: "${submission.biggestGrowthChallenge}"
        
        Using your trademark "Surgical Growth Framework™" (the five pillars: Visibility, Tracking, Conversion, Discipline, Growth) and the "Ten-Stage Patient Journey Funnel" (Enquiry -> Lead Qualification -> OPD Booking -> Consultation -> Procedure Recommendation -> Follow-up -> Procedure Confirmation -> Surgery -> Patient Experience -> Referral Generation):
        
        Please produce a completely customized, highly authoritative, clinical, metrics-focused diagnostic analysis as a structured JSON report.
        
        Ensure your analysis points out actual bottlenecks (like front-office leakage, lack of OPD-to-procedure follow-ups, and marketing without accountability) rather than recommending standard ads. Direct your recommendations toward structural conversion systems and growth visibility. No generic agency buzzwords. Keep the tone strategic, respectful, objective, and deeply professional.
      `;

      // Call Gemini 3.5 Flash
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `
            You are Sunil Sulegai - Surgical Practice Growth Partner. You help surgeon-owned surgical centers and specialty practices build predictable, repeatable volume through data-driven patient conversion ecosystems, front-office coordination, and operational accountability. You analyze practice metrics with diagnostic precision.
          `,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              leakageAnalysis: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stage: { type: Type.STRING, description: "Stage of the 10-step patient journey showing major leak." },
                    description: { type: Type.STRING, description: "Detailed, custom strategic insight about why leakage occurs at this stage for their specialty." },
                    severity: { type: Type.STRING, description: "Severity score: High, Medium, or Low" },
                    leakageRateEst: { type: Type.STRING, description: "Estimated percentage of enquiries/patients lost at this stage (e.g. '35% drop-off')." }
                  },
                  required: ["stage", "description", "severity", "leakageRateEst"]
                }
              },
              operationalBenchmarks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    metric: { type: Type.STRING, description: "KPI being benchmarking (e.g., Lead Contact Speed, OPD to Consultation, Post-Recommendation Follow-up)." },
                    averagepractice: { type: Type.STRING, description: "Standard performance average representing typical unoptimized clinics in their specialty." },
                    targetperformance: { type: Type.STRING, description: "Optimized operational standard achieved under your Surgical Growth Framework." },
                    impact: { type: Type.STRING, description: "Immediate strategic benefit of reaching the target (e.g., '+22% procedure conversion speed')." }
                  },
                  required: ["metric", "averagepractice", "targetperformance", "impact"]
                }
              },
              actionableRoadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    pillar: { type: Type.STRING, description: "Pillar name: Visibility, Tracking, Conversion, Discipline, or Growth." },
                    actionItems: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING, description: "Concrete, actionable step to fix their challenge." }
                    },
                    expectedOutcome: { type: Type.STRING, description: "The measurable KPI improvement expected from this pillar." },
                    timeline: { type: Type.STRING, description: "Suggested timeline (e.g. 'Weeks 1-3', 'Weeks 4-6')." }
                  },
                  required: ["pillar", "actionItems", "expectedOutcome", "timeline"]
                }
              },
              estimatedOpportunity: {
                type: Type.OBJECT,
                properties: {
                  currentAnnualprocedures: { type: Type.INTEGER, description: "Current estimated annual surgical volume." },
                  potentialAnnualprocedures: { type: Type.INTEGER, description: "Projected annual surgical volume with leakages minimized." },
                  estimatedRevenueLift: { type: Type.STRING, description: "Projected conservative value expansion calculated based on typical specialty yield increases." }
                },
                required: ["currentAnnualprocedures", "potentialAnnualprocedures", "estimatedRevenueLift"]
              }
            },
            required: ["leakageAnalysis", "operationalBenchmarks", "actionableRoadmap", "estimatedOpportunity"]
          }
        }
      });

      const responseText = response.text || "";
      const resultObj = JSON.parse(responseText.trim());

      return res.json({
        success: true,
        submissionId: submission.id,
        audit: resultObj
      });
    } else {
      // Fallback mock report based on specialties if no API key is specified
      const fallbackReport = getFallbackReport(submission.specialty, currentProceduresNumeric, submission.biggestGrowthChallenge);
      return res.json({
        success: true,
        submissionId: submission.id,
        audit: fallbackReport,
        isFallback: true
      });
    }
  } catch (error: any) {
    console.error("Error generating Surgical Growth Audit with Gemini:", error);
    // Return high-quality fallback error handling
    const fallbackReport = getFallbackReport(submission.specialty, currentProceduresNumeric, submission.biggestGrowthChallenge);
    return res.json({
      success: true,
      submissionId: submission.id,
      audit: fallbackReport,
      isFallback: true,
      warning: "Gemini server lookup returned an error; using fallback diagnostic model."
    });
  }
});

// GET Endpoint to fetch total submissions or check status (useful for tracking console)
app.get("/api/submissions", (req, res) => {
  res.json({
    count: submissions.length,
    recent: submissions.slice(0, 5)
  });
});

// Helper: Custom Strategic Fallback Generator matching Sunil's framework
function getFallbackReport(specialty: string, currentMonthlyVolume: number, challenge: string) {
  const annualVol = currentMonthlyVolume * 12;
  const potentialVol = Math.round(annualVol * 1.35); // Estimated 35% growth by sealing leaks
  const estimatedDiff = potentialVol - annualVol;
  
  // Custom revenue calculations based on typical specialty yield
  let revenueLift = "INR 45L to 1.2 Crore";
  const specLower = specialty.toLowerCase();
  if (specLower.includes("ortho") || specLower.includes("bone")) {
    revenueLift = "₹60 Lakhs - ₹1.8 Crores ($75k - $220k USD) annually";
  } else if (specLower.includes("plastic") || specLower.includes("cosmetic")) {
    revenueLift = "₹80 Lakhs - ₹2.4 Crores ($100k - $300k USD) annually";
  } else if (specLower.includes("cardio") || specLower.includes("heart")) {
    revenueLift = "₹1.2 Crores - ₹3.5 Crores ($150k - $450k USD) annually";
  } else if (specLower.includes("ophthal") || specLower.includes("eye") || specLower.includes("cataract")) {
    revenueLift = "₹25 Lakhs - ₹80 Lakhs ($30k - $100k USD) annually";
  }

  return {
    leakageAnalysis: [
      {
        stage: "PD Consultation to Recommended Procedure",
        description: `Loss of surgical candidates due to sub-optimal follow-up coordinates. Patients given a procedure counseling recommendation are left to 'think about it' without a structured touchpoint program, leading to a high drop-off to corporate networks.`,
        severity: "High",
        leakageRateEst: "35% - 40% Drop-off Rate"
      },
      {
        stage: "Digital / Direct Practice Enquiries",
        description: `Lack of lead qualification boundaries. Front-office responders take too long (>4 hours) to call back web or chat enquiries, causing candidates to call competitors instead of booking outpatient department (OPD) slots.`,
        severity: "High",
        leakageRateEst: "45% Opportunity Spill"
      },
      {
        stage: "OPD Booking to Consultation Check-In",
        description: `High 'No-Show' leakage due to poor automated confirmation sequences. Front office focuses on clerical tasks instead of delivering reassurance pathways for surgical anxiety.`,
        severity: "Medium",
        leakageRateEst: "20% Drop-off"
      }
    ],
    operationalBenchmarks: [
      {
        metric: "Front-Office Lead Response Time",
        averagepractice: "4.5 Hours",
        targetperformance: "< 5 Minutes",
        impact: "Increases Enquiry-to-OPD conversion speed by 62%"
      },
      {
        metric: "Patient Counseling Follow-Up Cycles",
        averagepractice: "1 Single Follow-up",
        targetperformance: "4 Structured touchpoints over 14 days",
        impact: "Generates +28% surgery confirmations from pending patient lists"
      },
      {
        metric: "Referral Ecosystem Visibility",
        averagepractice: "Manual tracking / Unrecorded",
        targetperformance: "Complete digital tracking & appreciation feedback loop",
        impact: "Drives consistent 15% increase in surgical patient word-of-mouth"
      }
    ],
    actionableRoadmap: [
      {
        pillar: "Visibility",
        actionItems: [
          "Audit and label every source of digital, reference, and panel enquiries.",
          "Establish a unified lead capture center directly integrated with a light clinical ledger."
        ],
        expectedOutcome: "100% visibility of patient origination details.",
        timeline: "Weeks 1 - 2"
      },
      {
        pillar: "Tracking",
        actionItems: [
          "Deploy custom conversion trackers at the counseling desk to flag pending recommendations.",
          "Introduce a visual daily pipeline highlighting patient drop-off stages."
        ],
        expectedOutcome: "Clear accountability over where patients stall.",
        timeline: "Weeks 3 - 4"
      },
      {
        pillar: "Conversion Optimization / Coordination",
        actionItems: [
          "Train front office and medical counselors on Sunil's Surgical Anxiety Management (SAM) guidelines.",
          "Implement structured, highly reassuring SMS and WhatsApp feedback pathways."
        ],
        expectedOutcome: "Increase counselor-to-procedure confirmation rates.",
        timeline: "Weeks 5 - 6"
      }
    ],
    estimatedOpportunity: {
      currentAnnualprocedures: annualVol,
      potentialAnnualprocedures: potentialVol,
      estimatedRevenueLift: revenueLift
    }
  };
}

// Vite static assets serving & SPA router
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    // Development server with Vite middleware hot reload proxying
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Full-Stack Server Node] Active on http://0.0.0.0:${PORT}`);
  });
};

startServer();
