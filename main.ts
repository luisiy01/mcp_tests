import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import fs from 'fs';
import FormData from 'form-data';

// crear servidor
const servidor = new McpServer({
    name: "servidor-mcp-proyectos",
    version: "1.0.0"
})

const BASE_URL = "http://localhost:3000/api/project"


servidor.registerTool(
    'guardar_proyecto',
    {
        title: 'Guardar un proyecto',
        description: 'Crea un nuevo proyecto',
        inputSchema: {
            name: z.string(),
            description: z.string(),
            state: z.string()
        }
    },
    async ({ name, description, state }) => {
        const respuesta = await fetch(`${BASE_URL}/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                state
            })
        });

        if (!respuesta.ok) {
            throw new Error(`Error al guardar el proyecto: ${respuesta.statusText}`)
        }

        const datos = await respuesta.json()
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(datos, null, 2)
                }
            ]
        }
    }
)

servidor.registerTool(
    'listar_proyectos',
    {
        title: 'Listar proyectos',
        description: 'Devuelve la lista de proyectos'
    },
    async () => {
        const respuesta = await fetch(`${BASE_URL}/list`);

        if (!respuesta.ok) {
            throw new Error(`Error al listar los proyectos: ${respuesta.statusText}`)
        }

        const datos = await respuesta.json();
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(datos, null, 2)
                }
            ]
        }
    }
)

servidor.registerTool(
    'obtener_proyecto',
    {
        title: 'Obtener proyecto por ID',
        description: 'Devuelve los datos de unproyecto especifico',
        inputSchema: {
            id: z.string()
        }
    },
    async ({ id }) => {
        const respuesta = await fetch(`${BASE_URL}/item/${id}`);

        if (!respuesta.ok) {
            throw new Error(`Error al obtener el proyecto: ${respuesta.statusText}`)
        }

        const datos = await respuesta.json();
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(datos, null, 2)
                }
            ]
        }
    }
)

servidor.registerTool('eliminar_proyecto', {
    title: 'Eliminar proyecto',
    description: 'Elimina un proyecto por su id',
    inputSchema: {
        id: z.string()
    }
}, async ({ id }) => {
    const respuesta = await fetch(`${BASE_URL}/delete/${id}`, {
        method: 'DELETE'
    });

    if (!respuesta.ok) {
        throw new Error(`Error al eliminar el proyecto: ${respuesta.statusText}`)
    }

    const datos = await respuesta.json();
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(datos, null, 2)
            }
        ]
    }
})

servidor.registerTool('actualizar_proyecto', {
    title: 'Actualizar proyecto',
    description: 'Actualiza los datos de un proyecto por su id',
    inputSchema: {
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        state: z.string().optional()
    }
}, async ({ id, name, description, state }) => {
    const respuesta = await fetch(`${BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            state
        })
    });

    if (!respuesta.ok) {
        throw new Error(`Error al actualizar el proyecto: ${respuesta.statusText}`)
    }

    const datos = await respuesta.json();
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(datos, null, 2)
            }
        ]
    }
})

servidor.registerTool('obtener_imagen_proyecto', {
    title: 'Obtener imagen del proyecto',
    description: 'Obtiene la imagen de un proyecto',
    inputSchema: {
        file: z.string()
    }
}, async ({ file }) => {
    const respuesta = await fetch(`${BASE_URL}/image/${file}`);

    if (!respuesta.ok) {
        throw new Error(`Error al obtener la imagen del proyecto: ${respuesta.statusText}`)
    }
    const blob = await respuesta.arrayBuffer();
    const base64 = Buffer.from(blob).toString('base64');

    return {
        content: [
            {
                type: 'image',
                data: base64,
                mimeType: respuesta.headers.get('content-type') || 'image/png'
            }
        ]
    }
})



// conexion del server con la ia
const transporte = new StdioServerTransport();
await servidor.connect(transporte);