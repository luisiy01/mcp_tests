import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// crear servidor
const servidor = new McpServer({
    name: "servidor-mcp-luis",
    version: "1.0.0"
});
// crear una herramienta
servidor.registerTool('multiplicar', {
    title: 'Herramienta de multiplicar numeros',
    description: 'Multiplica dos números',
    inputSchema: {
        numero1: z.number(),
        numero2: z.number()
    }
}, async ({ numero1, numero2 }) => {
    if (typeof numero1 !== 'number' || typeof numero2 !== 'number') {
        throw new Error('Los números deben ser números');
    }
    return {
        content: [
            {
                type: 'text',
                text: String(numero1 * numero2)
            }
        ]
    };
});
servidor.registerResource('saludar', new ResourceTemplate('saludar://{nombre}', { list: undefined }), { title: 'Recurso para saludar', description: 'Recurso para saludar a una persona' }, async (url, { nombre }) => {
    if (typeof nombre !== 'string') {
        throw new Error('El nombre debe ser una cadena de texto');
    }
    return {
        contents: [
            {
                uri: url.href,
                text: `Hola, saludos terricola ${nombre}`
            }
        ]
    };
});
// conexion del server con la ia
const transporte = new StdioServerTransport();
await servidor.connect(transporte);
