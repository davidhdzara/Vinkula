import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
) => {
  try {
    const model = "gemini-3-pro-preview";
    
    // Convert history to the format expected by the SDK if needed, 
    // though for single turn generateContent usually suffices, 
    // chats.create is better for history.
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: "Eres un asistente financiero experto, amable y conciso. Ayudas a los usuarios a gestionar sus finanzas personales, presupuestos y ahorros en la aplicación 'Finanzas Personales'. Tus respuestas deben ser breves y fáciles de leer en un dispositivo móvil. Usa formato markdown cuando sea útil.",
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Lo siento, no pude generar una respuesta.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Hubo un error al conectar con el asistente. Por favor intenta de nuevo.";
  }
};
