import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, aesthetic } = await req.json();
    
    if (!imageBase64 || !aesthetic) {
      return new Response(
        JSON.stringify({ error: "Missing image or aesthetic" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aestheticPrompts: Record<string, string> = {
      "editorial-muse": "high fashion editorial photography, runway model aesthetic, dramatic lighting, Vogue magazine style, sophisticated poses",
      "soft-luxury": "understated elegance, cashmere and silk textures, neutral tones, quiet luxury, old money aesthetic",
      "modern-minimal": "clean lines, contemporary architecture backdrop, minimalist styling, sharp tailoring, monochromatic palette",
      "elevated-street": "refined streetwear, urban backdrop, designer casual, confident stance, metropolitan chic",
      "high-gloss-glam": "red carpet ready, glamorous makeup, statement pieces, dramatic lighting, celebrity style",
      "quiet-rich": "subtle wealth, premium fabrics, timeless pieces, refined accessories, understated confidence",
      "digital-authority": "tech executive style, modern professional, confident posture, sleek contemporary look, innovation aesthetic",
      "creative-director": "artistic vision, avant-garde styling, creative workspace, visionary leader aesthetic, bold artistic choices",
    };

    const stylePrompt = aestheticPrompts[aesthetic] || "elegant and sophisticated styling";
    
    const basePrompt = `Generate an AI twin variation of this person. Maintain clear character consistency - keep the exact same face, identity, and general body type. The person should be styled with: ${stylePrompt}. Use high-end editorial photography look with clean lighting and realistic textures. Full body visible, 9:16 vertical portrait ratio, professional quality, polished modern aesthetic. The result should feel cohesive and editorial.`;

    console.log("Generating images for aesthetic:", aesthetic);

    const generatedImages: string[] = [];
    const variations = [
      "standing confidently with elegant pose",
      "seated with sophisticated demeanor",
      "walking dynamically with purpose",
      "three-quarter view with thoughtful expression",
      "full frontal view with powerful stance",
      "artistic angle with creative lighting"
    ];

    // Generate 6 variations
    for (let i = 0; i < 6; i++) {
      try {
        console.log(`Generating image ${i + 1}/6...`);
        
        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-pro-image-preview",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `${basePrompt} Variation ${i + 1}: ${variations[i]}. Change the outfit and pose while maintaining the exact same person's face and identity.`,
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: imageBase64,
                    },
                  },
                ],
              },
            ],
            modalities: ["image", "text"],
          }),
        });

        if (!response.ok) {
          if (response.status === 429) {
            console.error("Rate limit hit");
            return new Response(
              JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment.", images: generatedImages }),
              { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          if (response.status === 402) {
            console.error("Payment required");
            return new Response(
              JSON.stringify({ error: "AI usage limit reached. Please add credits to continue.", images: generatedImages }),
              { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          console.error(`Image ${i + 1} generation failed:`, response.status);
          continue;
        }

        const data = await response.json();
        const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        
        if (imageUrl) {
          generatedImages.push(imageUrl);
          console.log(`Image ${i + 1} generated successfully`);
        }
      } catch (error) {
        console.error(`Error generating image ${i + 1}:`, error);
      }
    }

    if (generatedImages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Failed to generate images. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully generated ${generatedImages.length} images`);

    return new Response(
      JSON.stringify({ images: generatedImages }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-twins:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
