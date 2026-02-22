import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pdfText, jobDescription, template } = await req.json();

    if (!pdfText || !jobDescription || !template) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: pdfText, jobDescription, template" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a professional CV/resume writer specializing in ATS-optimized resumes. You will receive:
1. Raw text extracted from a LinkedIn PDF profile
2. A job description the user is targeting
3. A template style preference

Your task is to generate an ATS-friendly, tailored, professional CV in structured JSON format. The CV MUST pass Applicant Tracking Systems (ATS) screening.

Return ONLY valid JSON with this exact structure (no markdown, no code blocks):
{
  "name": "Full Name",
  "title": "Professional Title tailored to the job",
  "email": "email@example.com",
  "location": "City, Country",
  "summary": "2-3 sentence professional summary tailored to the target role",
  "experience": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "period": "Start – End",
      "bullets": ["Achievement 1", "Achievement 2"]
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "University Name",
      "year": "Year"
    }
  ],
  "skills": ["Skill 1", "Skill 2", "..."],
  "certifications": ["Cert 1", "..."]
}

ATS Optimization Guidelines:
- Use STANDARD job titles that ATS systems recognize (e.g. "Software Engineer" not "Code Ninja").
- Include EXACT keywords and phrases from the job description naturally woven into experience bullets and summary — but NEVER copy sentences verbatim. Always rephrase in the candidate's own voice.
- Use STANDARD section headings (Summary, Experience, Education, Skills, Certifications).
- Write bullet points starting with strong ACTION VERBS (Led, Developed, Implemented, Optimized, Delivered, Managed, Designed, etc.).
- Quantify achievements with realistic metrics (percentages, dollar amounts, team sizes, timescales) based on the profile data.
- Include BOTH the spelled-out term AND its acronym for technical skills (e.g. "Search Engine Optimization (SEO)") to maximize ATS keyword matching.
- List skills as individual, specific terms — avoid vague phrases like "team player" or "hard worker".
- Order skills by relevance to the target job, placing the most critical ATS-matching skills first.
- Include 8-12 most relevant skills to maximize ATS keyword score.
- Keep bullet points concise (1-2 lines each), impactful, and results-oriented.
- Avoid graphics-dependent content descriptions — ATS cannot parse images, icons, or charts.
- Use simple, clean language — avoid tables, columns, or special characters that ATS may misread.`;

    const userPrompt = `LinkedIn Profile Data:
---
${pdfText}
---

Target Job Description:
---
${jobDescription}
---

Template style: ${template}

Generate a tailored CV in JSON format.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits in Settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the AI response (strip markdown code blocks if present)
    let cvData;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      cvData = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response as JSON:", content);
      throw new Error("Failed to parse AI-generated CV");
    }

    return new Response(JSON.stringify({ cv: cvData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-cv error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
