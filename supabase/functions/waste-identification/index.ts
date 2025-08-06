import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, description } = await req.json();
    
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY is not set');
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let prompt = `You are an agricultural waste expert. Analyze the provided waste and provide:
1. Waste type identification
2. Suggested recycling/reuse methods
3. Potential market value (in Indian Rupees per ton)
4. Industries that might be interested
5. Environmental impact of recycling vs burning

Format your response as JSON with these exact keys:
- wasteType
- recyclingMethods (array)
- marketValue
- interestedIndustries (array)
- environmentalImpact

`;

    let requestBody;

    if (image) {
      // Handle image analysis
      requestBody = {
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: image.replace(/^data:image\/[a-z]+;base64,/, '')
              }
            }
          ]
        }]
      };
    } else if (description) {
      // Handle text description
      prompt += `\nWaste description: ${description}`;
      requestBody = {
        contents: [{
          parts: [{ text: prompt }]
        }]
      };
    } else {
      return new Response(JSON.stringify({ error: 'Either image or description is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Making request to Gemini API...');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to analyze waste' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('Gemini API response:', data);

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Unexpected Gemini response structure:', data);
      return new Response(JSON.stringify({ error: 'Invalid response from AI service' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    
    try {
      // Try to parse as JSON
      const analysisResult = JSON.parse(generatedText);
      
      return new Response(JSON.stringify({
        success: true,
        analysis: analysisResult
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      // If parsing fails, return the raw text
      return new Response(JSON.stringify({
        success: true,
        analysis: {
          wasteType: "Unknown",
          recyclingMethods: [generatedText],
          marketValue: "Analysis in progress",
          interestedIndustries: ["Various"],
          environmentalImpact: generatedText
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in waste-identification function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});