import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// crear servidor
const servidor = new McpServer({
    name: "servidor-mcp-monedas",
    version: "1.0.0"
})


// crear una herramienta para sacar el valor de una moneda
servidor.registerTool(
    'valor_monedas',
    {
        title: 'Conseguir el valor de una moneda',
        description: 'Recibe el nombre de una moneda y devuelve su valor',
        inputSchema: {
            moneda: z.string().min(1, "Debe ingresar una moneda, por ejemplo: EUR, USD")
        }
    },
    async ({ moneda }) => {

        //https://cdn.moneyconvert.net/api/latest.json

        if (typeof moneda !== 'string') {
            throw new Error('La moneda debe ser una cadena de texto')
        }

        const url = `https://cdn.moneyconvert.net/api/latest.json`

        const respuesta = await fetch(url)

        if (!respuesta.ok) {
            throw new Error(`Error al acceder a la api`)
        }

        const datos = await respuesta.json()
        const base = 'USD';

        if (!datos.rates[moneda]) {
            throw new Error(`No se encontro el valor de la moneda ${moneda}`)
        }

        const value = datos.rates[moneda]

        return {
            content: [
                {
                    type: 'text',
                    text: `El valor actual de la moneda ${moneda.toUpperCase()} es ${value} frente a ${base}`
                }
            ]
        }
    }
)

//crear herramienta para convertir una cifra al valor de otra moneda
servidor.registerTool(
    'convertir_tipo_cambio',
    {
        title: 'Convertir una cifra al valor de otra moneda',
        description: 'Devuleve el valor de una moneda frente a otra',
        inputSchema: {
            moneda_origen: z.string().min(3, "Debe ingresar una moneda, por ejemplo: EUR, USD"),
            moneda_destino: z.string().min(3, "Debe ingresar una moneda, por ejemplo: EUR, USD"),
            cantidad: z.number()
        }
    },
    async ({ moneda_origen, moneda_destino, cantidad }) => {

        //https://cdn.moneyconvert.net/api/latest.json

        const url = `https://cdn.moneyconvert.net/api/latest.json`

        const respuesta = await fetch(url)

        if (!respuesta.ok) {
            throw new Error(`Error al acceder a la api`)
        }

        const datos = await respuesta.json()
        const { rates } = datos
        const base = 'USD';

        if (!rates || !rates) {
            throw new Error(`No se encontro el valor de la moneda`)
        }

        let rate;

        if (moneda_origen === base) {
            rate = rates[moneda_destino]
        } else {
            rate = rates[moneda_destino] / rates[moneda_origen]
        }

        const value_converted = cantidad * rate

        return {
            content: [
                {
                    type: 'text',
                    text: `El ${cantidad} ${moneda_origen} es igual a ${value_converted} ${moneda_destino} (Tasa: ${rate.toFixed(6)}, Moneda Base: ${base})`
                }
            ]
        }
    }
)

// conexion del server con la ia
const transporte = new StdioServerTransport();
await servidor.connect(transporte);