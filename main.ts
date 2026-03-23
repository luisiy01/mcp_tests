import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// crear servidor
const servidor = new McpServer({
    name: "servidor-mcp-calculadora",
    version: "1.0.0"
})


// crear las herramientas

servidor.registerTool('sumar',
    {
        title: 'Suma dos numeros',
        description: 'Recibe dos numeros y los suma',
        inputSchema: {
            numero1: z.number(),
            numero2: z.number()
        }
    },
    async ({ numero1, numero2 }) => {
        if (typeof numero1 !== 'number' || typeof numero2 !== 'number') {
            throw new Error('Los valores deben ser números')
        }
        return {
            content: [
                {
                    type: 'text',
                    text: String(numero1 + numero2)
                }
            ]
        }
    }

)

servidor.registerTool('restar',
    {
        title: 'Resta dos numeros',
        description: 'Recibe dos numeros y los resta',
        inputSchema: {
            numero1: z.number(),
            numero2: z.number()
        }
    },
    async ({ numero1, numero2 }) => {
        if (typeof numero1 !== 'number' || typeof numero2 !== 'number') {
            throw new Error('Los valores deben ser números')
        }
        return {
            content: [
                {
                    type: 'text',
                    text: String(numero1 - numero2)
                }
            ]
        }
    }

)

servidor.registerTool('multiplicar',
    {
        title: 'Multiplicar numeros',
        description: 'Multiplica dos números',
        inputSchema: {
            numero1: z.number(),
            numero2: z.number()
        }
    },
    async ({ numero1, numero2 }) => {
        if (typeof numero1 !== 'number' || typeof numero2 !== 'number') {
            throw new Error('Los valores deben ser números')
        }
        return {
            content: [
                {
                    type: 'text',
                    text: String(numero1 * numero2)
                }
            ]
        }
    }

)

servidor.registerTool('dividir',
    {
        title: 'Dividir numeros',
        description: 'Divide dos números',
        inputSchema: {
            numero1: z.number(),
            numero2: z.number()
        }
    },
    async ({ numero1, numero2 }) => {
        if (typeof numero1 !== 'number' || typeof numero2 !== 'number') {
            throw new Error('Los valores deben ser números')
        }
        return {
            content: [
                {
                    type: 'text',
                    text: String(numero1 / numero2)
                }
            ]
        }
    }

)

servidor.registerTool('resto_division',
    {
        title: 'Resto de la división',
        description: 'Recibe dos números y calcula el resto de la división',
        inputSchema: {
            numero1: z.number(),
            numero2: z.number()
        }
    },
    async ({ numero1, numero2 }) => {
        if (typeof numero1 !== 'number' || typeof numero2 !== 'number') {
            throw new Error('Los valores deben ser números')
        }
        return {
            content: [
                {
                    type: 'text',
                    text: String(numero1 % numero2)
                }
            ]
        }
    }

)

servidor.registerResource(
    'saludar',
    new ResourceTemplate('saludar://{nombre}', { list: undefined }),
    { title: 'Recurso para saludar', description: 'Recurso para saludar a una persona' },
    async (url, { nombre }) => {
        if (typeof nombre !== 'string') {
            throw new Error('El nombre debe ser una cadena de texto')
        }
        return {
            contents: [
                {
                    uri: url.href,
                    text: `Hola, saludos terricola ${nombre}`
                }
            ]
        }
    }
)

// conexion del server con la ia
const transporte = new StdioServerTransport();
await servidor.connect(transporte);