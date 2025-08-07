import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Google Service Account credentials
const serviceAccount = {
  type: "service_account",
  project_id: "focal-furnace-450806-i9",
  private_key_id: "27be60a67ba54a90ea2b458fb6b0d2b802e8f42f",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDnavzadXAjfY1P\nW88wcpzw8liyMHFNqgFvFImD5c8NXYpTVLAKLFbYjGTGyspSwP2xONkirWIRydfu\nc3R9oew/jTQlGpcKgP2M5Q9a6YBGpWQph+zaB1PWFPn9Se/TGpTS2lbXjtv9G6yb\ngXPXM39buB+dduT8dNQS4O92JSh6MGdbpF5H7pOb3VlS4aIrbxDfbvT6mQJ9YVMc\nTYgShb+yBvjh/Aw0xJgvK8aWsFHT2025C1KUQiVv2sT7ZXFbC5NIrL8L0ukOsfIQ\nBePHvkJKwoPMcaF4qTjlxuahuycBsO09m5RMmjHbjQJ843F6QhUFMthyohjf2i2W\nvU9fmLfpAgMBAAECggEAJ3yPaX05ZaziJETfnP4pfklzze/LHXvhI8GG110qj7bC\nyAY+xXWcWfXWqj7m9+jbQNaY4jxga/WbZSIJIfizlYJz/9LCK/YnjVd2X8ZQ730A\nEsARL4CpkvFgWJI5nDVAaJv9zmkfa1hCAwS7LeCpHg7UQiuL1fHfT9tWsLuVZQez\nKoYyH9TTbiz42j11x1Jzk4Q8goF1vqG8p/UyxLOdqcFlZbrJS2zZM8pVS6BbiSMM\naCkABXWxlq/ZUxececwc2NPzgch463BnhgIE9X8nAOp0+YtR7euBF2Y7qXqf+J2n\nccDrQZpqu1//ZBjSLqL+n+j0O2a04jXujwiItwm2QwKBgQD/Xf32icFzTJP29CEQ\nTXvXvzV8Gg2R+mc20FOFWUORfvh39ebAPLoRojQUVbJTX40FqHB4PTOjCEGYtV/b\ngnqbO+wgscX1KyC7+VN+9NKa1zCxCzDD307pZplp2e5RluR05DEV4yL+DRIgN+8o\nA3c/W9nmPBYsFhTdKFz9icsBpwKBgQDn/c1O8BKQfxPtvME7tumTfCTSeXVmOwlT\n5jKzI4TEgXyGAGV9dWNTA/m+RglbSQNrsWJKswwDUUGbdztKYa5txyme5VTgqTG/\nqmakVwWC+0G/ESSVAAdtLf3y6hwrkbPNNyX/e1FxvJV9pDIC5cjZMG/NLPehLL21\nI0v8LgAL7wKBgQDSzHD/GXoCRn2CBsZgYcXQM7vf5NW84fpfqhq34ha/vRM4W1mO\n6NIkCkR5YMBiyGZt/DxTVRoSA5e6ikZFunChQhbKalVh66cK5GbDTy+mt+ouy3EG\nz4ihbJtJYKe03B1cTJ4kViolkv6ab/HQkwPV3mmB/6nB3Lx+T3prpFpa0wKBgQDT\nDZ0IYXQiLNoOgJgzITbiTCCbso/Rj4fu4g/h1UBmHX8R0a6DMpZH4egE6GZ+u6/2\n+4t2delJ41SSgShZhQBRMs10lyJeuM5flkCG5fxHqxmnH4tuWnZnJ15O7hjuskEn\nQzK4eJIhrPU7NnOhGzdcD6rGuFAYO0HjVtc79wVn1QKBgQD0GFUMg9EgFc4ZTlwe\nGqQVN2ub4J68fH5KvzpPFgmg47bTgE4WIFePhYO6pU3ZpbchvnGLBcadDCeQYfHP\nttZNYyanQlEijF/DLvnog6k1NTsiHy0jfv6tR/DBjcJddJ9HLhxqaCYZD55zmvDu\nRvBuUdEQFZBB6s6qp+VqGwmnoQ==\n-----END PRIVATE KEY-----\n",
  client_email: "agricycle@focal-furnace-450806-i9.iam.gserviceaccount.com",
  client_id: "117437385359270664196",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/agricycle%40focal-furnace-450806-i9.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600; // 1 hour

  const header = {
    alg: "RS256",
    typ: "JWT"
  };

  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/generative-language",
    aud: serviceAccount.token_uri,
    iat: now,
    exp: exp
  };

  // Create JWT manually (simplified for this use case)
  const encoder = new TextEncoder();
  const keyData = serviceAccount.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\n/g, '');
  
  // For production, you'd properly sign the JWT
  // For now, we'll use the API key approach but with proper Google Cloud authentication
  
  const response = await fetch(serviceAccount.token_uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: 'dummy' // In real implementation, this would be the signed JWT
    })
  });

  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  }
  
  return null;
}

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
    
    // Use the hardcoded API key for Gemini
    const geminiApiKey = 'AIzaSyCPtMPHBa55A3gT-kt4SXIc5CVoO5w9LfI';

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
      let analysisResult;
      
      // Check if response contains markdown code blocks
      if (generatedText.includes('```json')) {
        // Extract JSON from markdown code block
        const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          // Remove any trailing commas before closing braces/brackets
          const cleanedJson = jsonMatch[1].replace(/,(\s*[}\]])/g, '$1');
          analysisResult = JSON.parse(cleanedJson);
        } else {
          throw new Error('Could not extract JSON from markdown');
        }
      } else {
        // Try to parse as direct JSON
        analysisResult = JSON.parse(generatedText);
      }
      return new Response(JSON.stringify({
        success: true,
        analysis: analysisResult
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Original response:', generatedText);
      
      // Fallback: return a structured response with the raw text
      return new Response(JSON.stringify({
        success: true,
        analysis: {
          wasteType: "Analysis completed",
          recyclingMethods: [generatedText],
          marketValue: "Please see detailed analysis above",
          interestedIndustries: ["Various industries"],
          environmentalImpact: {
            summary: "Analysis provided above contains environmental benefits"
          }
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