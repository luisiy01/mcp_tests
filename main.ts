import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// crear servidor
const servidor = new McpServer({
    name: "servidor-mcp-el-tiempo",
    version: "1.0.0"
})


// crear una herramienta para sacar el valor de una moneda
servidor.registerTool(
    'el_tiempo_de_una_ciudad',
    {
        title: 'Conseguir el clima actual de una ciudad',
        description: 'Devuelve todos los datos del clima para la ciudad que queramos',
        inputSchema: {
            city: z.string().min(2, "Indica una ciudad valida")
        }
    },
    async ({ city }) => {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`

        const respuesta_geo = await fetch(geoUrl)

        if (!respuesta_geo.ok) {
            throw new Error(`Error al acceder a la geolocalizacion de la ciudad`)
        }

        const datos_geo = await respuesta_geo.json()

        if (!datos_geo.results || datos_geo.results.length === 0) {
            throw new Error(`No se encontro la ciudad ${city}`)
        }

        const { latitude, longitude } = datos_geo.results[0]

        const tiempoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation&current=temperature_2m,precipitation`

        const respuesta_tiempo = await fetch(tiempoUrl)

        if (!respuesta_tiempo.ok) {
            throw new Error(`Error al sacar el clima de la ciudad`)
        }

        const datos_tiempo = await respuesta_tiempo.json()

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(datos_tiempo, null, 2)
                }
            ]
        }
    }
)


// conexion del server con la ia
const transporte = new StdioServerTransport();
await servidor.connect(transporte);